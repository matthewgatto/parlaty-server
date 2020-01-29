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
import Schemas from '@utils/models';
import API from '@utils/API';

function* handleNewStep(stepMeta, payload, idx, newIdx){
  const initialImage = (!stepMeta.isDuplicate && stepMeta.initialValues && stepMeta.initialValues.visual) ? stepMeta.initialValues.visual : false;
  var src = payload.step.visual instanceof File ? (
    yield call(utils.readFile, payload.step.visual)
  ) : (
    payload.step.visual
  );
  if(!stepMeta.isDuplicate){
    if(idx != newIdx){
      if(initialImage && !payload.step.visual){
        yield put(removeImageAndReIndex(payload.formKey, idx, newIdx))
      } else {
        yield put(reorderStep(payload.formKey, idx, newIdx, payload.step.visual && {id: stepMeta.id, idx: newIdx, src}))
      }
    } else if(!initialImage && payload.step.visual){
      yield put(addImage({id: stepMeta.id, idx: newIdx, src}))
    } else if(initialImage && payload.step.visual && initialImage != payload.step.visual){
      yield put(updateImage(stepMeta.id, {src}))
    } else if(initialImage && !payload.step.visual){
      yield put(removeImage(stepMeta.id))
    }
  } else {
    if(idx != newIdx){
      yield put(reorderStep(payload.formKey, idx, newIdx, payload.step.visual ? {id: stepMeta.id, idx: newIdx, src} : undefined))
    } else if(payload.step.visual){
      yield put(addImage({id: stepMeta.id, idx: newIdx, src}, true))
    }
  }
  yield put(setStepForm(payload.stepFormKey))
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


export function* stepSaveSaga(action){
  try {
    const {stepMeta, idx} = yield select(getStepSaveData);
    if(utils.getUpdatedProperties(action.payload.step, stepMeta.initialValues)){
      const newIdx = action.payload.step.number - 1;
      if(action.payload.procedure_id){
        const procedure = yield select(getProcedureById(action.payload.procedure_id));
        if(stepMeta.isDuplicate){
          yield call(createStepSaga, {step: action.payload.step, from: idx, to: newIdx, initialValues: stepMeta.initialValues, procedure})
        } else {
          yield call(updateStepSaga, {step: action.payload.step, from: idx, to: newIdx, initialValues: stepMeta.initialValues, procedure})
        }
      }
      yield call(handleNewStep, stepMeta, action.payload, idx, newIdx)
    } else {
      yield put(setStepForm(action.payload.stepFormKey))
    }
  } catch (e) {
    console.log("e", e);
    var formError = "An unexpected error has occurred"
    if(e.formError) formError = e.formError;
    else if(e === 401) formError = "Unauthorized";
    yield put({type: `${action.type}__FAILURE`, payload: {formKey: action.payload.formKey, errors:{formError}}})
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
