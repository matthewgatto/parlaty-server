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
} from '../actions/step'
import * as utils from '../../utils';
import Schemas from '../../utils/models';
import API from '../../utils/API';

function* handleNewStep(stepMeta, payload, idx, newIdx){
  const initialImage = (!stepMeta.isDuplicate && stepMeta.initialValues && stepMeta.initialValues.image) ? stepMeta.initialValues.image : false;
  var src = payload.step.image instanceof File ? (
    yield call(utils.readFile, payload.step.image)
  ) : (
    payload.step.image
  );
  if(!stepMeta.isDuplicate){
    if(idx != newIdx){
      if(initialImage && !payload.step.image){
        yield put(removeImageAndReIndex(payload.formKey, idx, newIdx))
      } else {
        yield put(reorderStep(payload.formKey, idx, newIdx, payload.step.image && {id: stepMeta.id, idx: newIdx, src}))
      }
    } else if(!initialImage && payload.step.image){
      yield put(addImage({id: stepMeta.id, idx: newIdx, src}))
    } else if(initialImage && payload.step.image && initialImage != payload.step.image){
      yield put(updateImage(stepMeta.id, {src}))
    } else if(initialImage && !payload.step.image){
      yield put(removeImage(stepMeta.id))
    }
  } else {
    if(idx != newIdx){
      yield put(reorderStep(payload.formKey, idx, newIdx, payload.step.image ? {id: stepMeta.id, idx: newIdx, src} : undefined))
    } else if(payload.step.image){
      yield put(addImage({id: stepMeta.id, idx: newIdx, src}, true))
    }
  }
  yield put(setStepForm(payload.stepFormKey))
}

const cleanStepCreateParams = ({id, number, skip,spoken, actions,image,audio,visual,visuals,has_visual,...step}) => {

  return image ? ({...step,visuals:[image], has_visual: true}) : step
}

const getDevices = ({devices}) => devices.byId
function* createStepSaga({procedure, step, from, to, initialValues}){
  try {
    const previous_step_id = to > 0 ? procedure.steps[to - 1] : 0;
    //const devices = yield select(getDevices)
    //step.device = devices[step.device] ? devices[step.device].name : "Crank Handle"
    const formData = utils.objectToFormData({
      step: {
        ...cleanStepCreateParams(step),
        procedure_id: procedure.id
      },
      previous_step_id
    });
    const response = yield call(API.multipost, "/steps", formData);
    const {visual, has_visual, ...newStep} = response;
    if(has_visual){
      newStep.image = visual;
    }
    var steps;
    if(from !== to){
      steps = [...procedure.steps.slice(0, to), newStep, ...procedure.steps.slice(to)]
    } else {
      steps = [...procedure.steps, newStep]
    }
    yield put({type: "STEP_SAVE_REQUEST__SUCCESS", payload: normalize({id:procedure.id, steps}, Schemas.procedure).entities});
  } catch (e) {
    console.log("ERROR", e);
    throw e
  }
}
const cleanStepUpdateParams = ({id, number, skip, spoken,actions,image,audio,visual,visuals,has_visual,...step}) => {
  /*
  if(image){
    if(typeof image === "string"){
      step.visual = image
    } else {
      step.visuals = [image];
      step.has_visual = true;
    }
  }
  */
  return step
}

function* updateStepSaga({procedure, step, from, to, initialValues}){
  try {
    step.id = procedure.steps[from];
    //const devices = yield select(getDevices)
    //step.device = devices[step.device] ? devices[step.device].name : "Crank Handle"
    const body = {step: cleanStepUpdateParams(step)};
    if(from !== to){
      body.previous_step_id = to > 0 ? procedure.steps[to - 1] : 0;
    }
    const formData = utils.objectToFormData(body);
    const response = yield call(API.multiput, `/steps/${step.id}`, formData);
    if(from !== to){
      var steps;
      if(from > to){
        steps = [...procedure.steps.slice(0, to), response, ...procedure.steps.slice(to, from), ...procedure.steps.slice(from+1)]
      } else {
        steps = [...procedure.steps.slice(0, from), ...procedure.steps.slice(from+1, to+1), response, ...procedure.steps.slice(to + 1)]
      }
      yield put({type: "STEP_SAVE_REQUEST__SUCCESS", payload: normalize({id:response.procedure_id, steps}, Schemas.procedure).entities})
    } else {
      yield put({type: "STEP_SAVE_REQUEST__SUCCESS", payload: normalize(response, Schemas.step).entities})
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


const getProcedures = ({procedures}) => procedures.byId
export function* stepSaveSaga(action){
  try {
    const stepMeta = yield select(({steps}) => steps.open);
    const steps = yield select(({steps}) => steps.forms);
    const idx = steps.findIndex(s => s === stepMeta.id);
    if(utils.getUpdatedProperties(action.payload.step, stepMeta.initialValues)){
      const newIdx = action.payload.step.number - 1;
      if(action.payload.procedure_id){
        const procedures = yield select(getProcedures);
        const procedure = procedures[action.payload.procedure_id];
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
    console.log("PROCEDURE", procedure_id);
    if(procedure_id){
      const procedures = yield select(getProcedures);
      const {steps} = procedures[procedure_id];
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
