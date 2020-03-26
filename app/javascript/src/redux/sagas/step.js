import { call, put, select, fork } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import {
  reorderStep,
  closeStepForm
} from '@actions/step';
import {getProcedureById} from '@selectors/procedure';
import {getStepFormData} from '@selectors/step';
import {getDeviceById} from '@selectors/device';
import * as utils from '@utils';
import { stepSchema } from '@utils/validation';
import Schemas from '@utils/models';
import API from '@utils/API';

export const cleanStepParams = ({id,audio,visual,has_visual,...step}) => {
  if(visual){
    if(typeof visual === "string"){
      step.visual = visual
    } else {
      step.visuals = [visual]
      step.has_visual = true;
    }
  } else {
    step.has_visual = false;
  }
  if(!step.safety){
    step.safety = false
  }
  if(!step.spoken){
    step.spoken = false
  }
  return step;
}

function* createStepSaga({procedure, step, initialValues}){
  try {
    const response = yield call(API.multipost, "/steps", utils.objectToFormData({
      step: cleanStepParams({
        ...step,
        procedure_id: procedure.id
      })
    }));
    return {...normalize({...procedure,steps: procedure.steps ? [...procedure.steps, response] : [response]}, Schemas.procedure).entities,id: response.id}
  } catch (e) {
    throw e
  }
}

function* updateStepSaga({procedure, step, idx, initialValues}){
  try {
    step.id = procedure.steps[idx];
    const body = {step: cleanStepParams(step)};
    const response = yield call(API.multiput, `/steps/${step.id}`, utils.objectToFormData(body));
    return {...normalize(response, Schemas.step).entities, id: response.id}
  } catch (e) {
    throw e
  }
}


export function* deleteStepSaga({type, payload}){
  try {
    yield call(API.delete, `/steps/${payload.id}`)
    yield put({type: `${type}__SUCCESS`, payload})
  } catch (e) {

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

function* addStepActionValues(step, values, root){
  const device = yield select(getDeviceById(step.device_id));
  if(device.actions){
    const actionsRoot = `${root}actions`
    step.actions = device.actions.map(id => {
      const actionRoot = `${actionsRoot}[${id}].`;
      const {name,parameter_name,...actionCopyValues} = utils.makeAction(values, actionRoot);
      return({id, ...actionCopyValues})
    }).filter(action => Object.keys(action).length > 1)
  }
}

export function* stepSaveSaga({type,payload:{values,root,procedure_id,id,idx,formKey}}){
  try {
    const stepMeta = yield select(getStepFormData(id, idx));
    var step = utils.makeStep(values, root);
    if(step.device_id){
      yield call(addStepActionValues, step, values, root)
    }
    yield call(validateStep, step, root)
    var successPayload = {};
    if(procedure_id){
      const procedure = yield select(getProcedureById(procedure_id));
      if(stepMeta.isDuplicate){
        successPayload = yield call(createStepSaga, {step, initialValues: stepMeta.initialValues, procedure})
      } else {
        successPayload = yield call(updateStepSaga, {step, idx, initialValues: stepMeta.initialValues, procedure})
      }
    }
    yield put({type: "STEP_SAVE_REQUEST__SUCCESS", payload: {formKey, idx, ...successPayload}});
  } catch (e) {
    console.log("stepSaveSaga ERROR", e);
    if(e.type === "VALIDATION_FAILURE"){
      yield put({type: `${type}__FAILURE`, payload: {formKey, errors:{fieldErrors: e.fieldErrors}}})
    } else {
      var formError = "An unexpected error has occurred"
      if(e.formError) formError = e.formError;
      else if(e === 401) formError = "Unauthorized";
      yield put({type: `${type}__FAILURE`, payload: {formKey, errors:{formError}}})
    }
  }
}

export function* reorderStepSaga({payload:{procedure_id, from, to}}){
  try {
    if(procedure_id){
      const procedure = yield select(getProcedureById(procedure_id));
      const stepOrder = utils.immutableMove(procedure.steps,from,to);
      var steps_order = stepOrder[0]+"";
      for (var i = 1; i < stepOrder.length; i++) {
        steps_order += `,${stepOrder[i]}`
      }
      const formData = utils.objectToFormData({procedure: {steps_order}});
      const response = yield call(API.multiput, `/procedures/${procedure_id}/reorder`, formData);
      yield put({type: "REORDER_STEP_REQUEST__SUCCESS", payload: {procedures: {[procedure_id]: {steps: stepOrder}}}});
    }
  } catch (e) {

  }
}
