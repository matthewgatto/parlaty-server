import { call, put, select, fork } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import {
  reorderStep,
  closeStepForm
} from '@actions/step';
import {getProcedureById} from '@selectors/procedure';
import {getStepFormData} from '@selectors/step';
import * as utils from '@utils';
import { stepSchema } from '@utils/validation';
import Schemas from '@utils/models';
import API from '@utils/API';

export const cleanStepParams = ({id,number,audio,visual,...step}) => {
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
  return step;
}

function* createStepSaga({procedure, step, from, to, initialValues}){
  try {
    const body = {
      step: cleanStepParams({
        ...step,
        procedure_id: procedure.id
      })
    }
    if(from !== to){
      body.previous_step_id = to > 0 ? procedure.steps[to - 1] : 0;
    }
    const formData = utils.objectToFormData(body);
    const response = yield call(API.multipost, "/steps", formData);
    var steps;
    if(from !== to){
      steps = [...procedure.steps.slice(0, to), response, ...procedure.steps.slice(to)]
    } else {
      steps = [...procedure.steps, response]
    }
    return {...normalize({id:procedure.id, steps}, Schemas.procedure).entities,id: response.id}
  } catch (e) {
    throw e
  }
}

function* updateStepSaga({procedure, step, from, to, initialValues}){
  try {
    step.id = procedure.steps[from];
    const body = {step: cleanStepParams(step)};
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
      return {...normalize({id:procedure.id, steps}, Schemas.procedure).entities, id: response.id}
    } else {
      return {...normalize(response, Schemas.step).entities, id: response.id}
    }
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


export function* stepSaveSaga({type,payload:{values,root,procedure_id,id,idx,formKey}}){
  try {
    const stepMeta = yield select(getStepFormData(id, idx));
    const step = utils.makeStep(values, root);
    yield call(validateStep, step, root)
    const newIdx = step.number - 1;
    var successPayload = {};
    if(procedure_id){
      const procedure = yield select(getProcedureById(procedure_id));
      if(stepMeta.isDuplicate){
        successPayload = yield call(createStepSaga, {step, from: idx, to: newIdx, initialValues: stepMeta.initialValues, procedure})
      } else {
        successPayload = yield call(updateStepSaga, {step, from: idx, to: newIdx, initialValues: stepMeta.initialValues, procedure})
      }
    }
    if(idx !== newIdx){
      yield put(reorderStep(idx, newIdx, procedure_id))
    }
    yield put({type: "STEP_SAVE_REQUEST__SUCCESS", payload: {idx: newIdx, formKey, ...successPayload}});
  } catch (e) {
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

  }
}
