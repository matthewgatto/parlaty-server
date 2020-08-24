import { call, put, select, fork, take } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import {getProcedureById} from '@selectors/procedure';
import {getStepFormData} from '@selectors/step';
import {getDeviceById} from '@selectors/device';
import * as utils from '@utils';
import { stepSchema } from '@utils/validation';
import Schemas from '@utils/models';
import API from '@utils/API';
import {makeObjRequest} from '@utils/uploader';
import {STEP_SAVE_REQUEST__SUCCESS} from '@types/step';

function* createStepSaga({procedure, step, initialValues}){
  try {
    const response = yield call(makeObjRequest, {...step, procedure_id: procedure.id }, "/steps", "post", "step");
    return {...normalize({...procedure,steps: procedure.steps ? [...procedure.steps, response] : [response]}, Schemas.procedure).entities,id: response.id}
  } catch (e) {
    throw e
  }
}

function* updateStepSaga({procedure, step, idx, initialValues}){
  try {
    step.id = procedure.steps[idx];
    const response = yield call(makeObjRequest, step, `/steps/${step.id}`, "put", "step");
    return {...normalize(response, Schemas.step).entities, id: response.id}
  } catch (e) {
    throw e
  }
}


export function* deleteStepSaga({type, payload}){
  try {
    yield call(API.delete, `/steps/${payload.id}`);
    yield put({type: `${type}__SUCCESS`, payload})
  } catch (e) {

  }
}

const validateStep = async (step, root) => {
  try {
    await stepSchema.validate(step, {abortEarly: false, stripUnknown: true});
  } catch (e) {
    const fieldErrors = {};
    for (let i = 0; i < e.inner.length; i++) {
      fieldErrors[`${root}${e.inner[i].path}`] = e.inner[i].message
    }
    throw {type: "VALIDATION_FAILURE", fieldErrors}
  }
};

function* addStepActionValues(step, values, root){
  const device = yield select(getDeviceById(step.device_id));
  if(device.actions){
    const actionsRoot = `${root}actions`;
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
    let step = utils.makeStep(values, root);
    if(step.device_id){
      yield call(addStepActionValues, step, values, root)
    }
    yield call(validateStep, step, root);
    let successPayload = {};
    if(procedure_id){
      const procedure = yield select(getProcedureById(procedure_id));
      if(stepMeta.isDuplicate){
        successPayload = yield call(createStepSaga, {procedure, step, initialValues: stepMeta.initialValues})
      } else {
        successPayload = yield call(updateStepSaga, {procedure, step, idx, initialValues: stepMeta.initialValues})
      }
    }
    yield put({type: STEP_SAVE_REQUEST__SUCCESS, payload: {formKey, idx, ...successPayload}});
  } catch (e) {
    console.log("stepSaveSaga ERROR", e);
    if(e.type === "VALIDATION_FAILURE"){
      yield put({type: `${type}__FAILURE`, payload: {formKey, errors:{fieldErrors: e.fieldErrors}}})
    } else {
      let formError = "An unexpected error has occurred";
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
      let steps_order = stepOrder[0]+"";
      for (let i = 1; i < stepOrder.length; i++) {
        steps_order += `,${stepOrder[i]}`
      }
      const response = yield call(API.multiput, `/procedures/${procedure_id}/reorder`, {procedure: {steps_order}});
      yield put({type: "REORDER_STEP_REQUEST__SUCCESS", payload: {procedures: {[procedure_id]: {...procedure,steps: stepOrder, steps_order: stepOrder}}}});
    }
  } catch (e) {

  }
}
