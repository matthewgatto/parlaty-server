import { call, put, select, fork } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import {
  reorderImage,
  removeImage,
  updateImage,
  addImage,
  reIndexImages,
  setStepForm,
  reorderStep,
  removeImageAndReIndex
} from '@actions/step'
import {getDeviceName} from '@selectors/device';
import {getProcedureById} from '@selectors/procedure';
import {getStepSaveData} from '@selectors/step';
import * as utils from '@utils';
import { stepSchema } from '@utils/validation';
import Schemas from '@utils/models';
import API from '@utils/API';

function* handleNewStep(stepMeta, formKey, stepFormKey, step, idx, newIdx){
  const initialImage = (!stepMeta.isDuplicate && stepMeta.initialValues && stepMeta.initialValues.visual) ? stepMeta.initialValues.visual : false;
  var src = step.visual instanceof File ? (
    yield call(utils.readFile, step.visual)
  ) : (
    step.visual
  );
  if(!stepMeta.isDuplicate){
    if(idx != newIdx){
      if(initialImage && !step.visual){
        yield put(removeImageAndReIndex(formKey, idx, newIdx))
      } else {
        yield put(reorderStep(idx, newIdx, step.visual && {id: stepMeta.id, idx: newIdx, src}))
      }
    } else if(!initialImage && step.visual){
      yield put(addImage({id: stepMeta.id, idx: newIdx, src}))
    } else if(initialImage && step.visual && initialImage != step.visual){
      yield put(updateImage(stepMeta.id, {src}))
    } else if(initialImage && !step.visual){
      yield put(removeImage(stepMeta.id))
    }
  } else {
    if(idx != newIdx){
      yield put(reorderStep(idx, newIdx, step.visual ? {id: stepMeta.id, idx: newIdx, src} : undefined))
    } else if(step.visual){
      yield put(addImage({id: stepMeta.id, idx: newIdx, src}, true))
    }
  }
  yield put(setStepForm(stepFormKey))
}

const cleanStepCreateParams = ({id, number,visual,audio,...step}) => {
  if(visual){
    return typeof visual === "string" ? ({...step, visual}) : ({...step,visuals:[visual], has_visual: true})
  }
  return step
}

function* createStepSaga({procedure, step, from, to, initialValues}){
  try {
    const body = {}
    if(from !== to){
      body.previous_step_id = to > 0 ? procedure.steps[to - 1] : 0;
    }

    //step.device = yield select(getDeviceName)
    const cleanStep = cleanStepCreateParams({
      ...step,
      procedure_id: procedure.id
    });
    body.step = cleanStep;
    const formData = utils.objectToFormData(body);
    const response = yield call(API.multipost, "/steps", formData);
    const stepState = {...cleanStep, ...response};
    var steps;
    if(from !== to){
      steps = [...procedure.steps.slice(0, to), stepState, ...procedure.steps.slice(to)]
    } else {
      steps = [...procedure.steps, stepState]
    }
    yield put({type: "STEP_SAVE_REQUEST__SUCCESS", payload: normalize({id:procedure.id, steps}, Schemas.procedure).entities});
  } catch (e) {
    console.log("ERROR", e);
    throw e
  }
}
const cleanStepUpdateParams = ({id, number,visual,audio,...step}) => step

function* updateStepSaga({procedure, step, from, to, initialValues}){
  try {
    step.id = procedure.steps[from];
    //step.device = yield select(getDeviceName)
    const cleanStep = cleanStepUpdateParams(step)
    const body = {step: cleanStep};
    if(from !== to){
      body.previous_step_id = to > 0 ? procedure.steps[to - 1] : 0;
    }
    const formData = utils.objectToFormData(body);
    const response = yield call(API.multiput, `/steps/${step.id}`, formData);
    const stepState = {...cleanStep, ...response};
    if(from !== to){
      var steps;
      if(from > to){
        steps = [...procedure.steps.slice(0, to), stepState, ...procedure.steps.slice(to, from), ...procedure.steps.slice(from+1)]
      } else {
        steps = [...procedure.steps.slice(0, from), ...procedure.steps.slice(from+1, to+1), stepState, ...procedure.steps.slice(to + 1)]
      }
      yield put({type: "STEP_SAVE_REQUEST__SUCCESS", payload: normalize({id:procedure.id, steps}, Schemas.procedure).entities})
    } else {
      yield put({type: "STEP_SAVE_REQUEST__SUCCESS", payload: normalize(stepState, Schemas.step).entities})
    }
  } catch (e) {
    console.log("ERROR", e);
    throw e
  }
}


export function* deleteStepSaga({payload}){
  try {
    yield put({type: "DELETE_STEP_REQUEST__SUCCESS", payload})
    yield fork(API.delete, `/steps/${payload.id}`)
  } catch (e) {
      console.log("ERROR", e);
  }
}

const validateStep = async (step, root) => {
  try {
    await stepSchema.validate(step, {abortEarly: false, stripUnknown: true});
  } catch (e) {
    const fieldErrors = {};
    for (var i = 0; i < e.inner.length; i++) {
      fieldErrors[`${root}${e.inner[i].path}`] = e.inner[i].message
    }
    throw {type: "VALIDATION_FAILURE", fieldErrors}
  }
}

function getStepValues(values, root){
  const title = values[`${root}title`],
        spoken = values[`${root}spoken`],
        note = values[`${root}note`],
        number = values[`${root}number`],
        time = values[`${root}time`],
        mode = values[`${root}mode`],
        safety = values[`${root}safety`],
        visual = values[`${root}visual`],
        audio = values[`${root}audio`],
        location = values[`${root}location`],
        device = values[`${root}device`],
        step = {};

  if(title) step.title = title
  if(spoken) step.spoken = spoken
  if(note) step.note = note
  if(number) step.number = number
  if(time) step.time = time
  if(mode) step.mode = mode
  if(safety) step.safety = safety
  if(visual) step.visual = visual
  if(audio) step.audio = audio
  if(location) step.location = location
  if(device) step.device = device
  return step;
}

export function* stepSaveSaga(action){
  try {
    const {stepMeta, idx} = yield select(getStepSaveData);
    console.log("action", action);
    const step = getStepValues(action.payload.values, action.payload.root)
    console.log("step", step);
    yield call(validateStep, step, action.payload.root)
    if(utils.getUpdatedProperties(step, stepMeta.initialValues)){
      const newIdx = step.number - 1;
      if(action.payload.procedure_id){
        const procedure = yield select(getProcedureById(action.payload.procedure_id));
        if(stepMeta.isDuplicate){
          yield call(createStepSaga, {step, from: idx, to: newIdx, initialValues: stepMeta.initialValues, procedure})
        } else {
          yield call(updateStepSaga, {step, from: idx, to: newIdx, initialValues: stepMeta.initialValues, procedure})
        }
      }
      yield call(handleNewStep, stepMeta, action.payload.formKey, action.payload.stepFormKey, step, idx, newIdx)
    } else {
      yield put(setStepForm(action.payload.stepFormKey))
    }
  } catch (e) {
    console.log("e", e);
    if(e.type === "VALIDATION_FAILURE"){
      yield put({type: `${action.type}__FAILURE`, payload: {formKey: action.payload.formKey, errors:{fieldErrors: e.fieldErrors}}})
    } else {
      var formError = "An unexpected error has occurred"
      if(e.formError) formError = e.formError;
      else if(e === 401) formError = "Unauthorized";
      yield put({type: `${action.type}__FAILURE`, payload: {formKey: action.payload.formKey, errors:{formError}}})
    }
  }
}

export function* reorderStepSaga({payload:{procedure_id, from, to}}){
  try {
    if(procedure_id){
      const {steps} = yield select(getProcedureById(procedure_id));
      var stepOrder;
      if(from > to){
        stepOrder = [...steps.slice(0, to), steps[from], ...steps.slice(to, from), ...steps.slice(from+1)]
      } else {
        stepOrder = [...steps.slice(0, from), ...steps.slice(from+1, to+1), steps[from], ...steps.slice(to + 1)]
      }
      var steps_order = stepOrder[0]+"";
      for (var i = 1; i < stepOrder.length; i++) {
        steps_order += `, ${stepOrder[i]}`
      }
      const formData = utils.objectToFormData({procedure: {steps_order}});
      const response = yield call(API.multiput, `/procedures/${procedure_id}/reorder`, formData);
      yield put({type: "REORDER_STEP_REQUEST__SUCCESS", payload: {procedures: {[procedure_id]: {steps: stepOrder}}}});
    }
  } catch (e) {
      console.log("ERROR", e);
  }
}
