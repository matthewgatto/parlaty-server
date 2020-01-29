import { call, select, put } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import uniq from 'lodash/uniq';
import {formSaga,multipostSaga} from './form';
import {getSaga} from './fetch';
import { push } from 'connected-react-router';
import { addToast } from '@actions/toast';
import { getBusinessById } from '@selectors/business';
import { getUserRole } from '@selectors/auth';
import { getStepForms } from '@selectors/step';
import Schemas from '@utils/models';

function* getNewEntitiesFromProcedure(response,{payload:{values}}){
  const business = yield select(getBusinessById(values.procedure.oem_business_id)),
        data = normalize({id: response.id, name: values.procedure.name}, Schemas.procedure);
  return {
    businesses: {
      [values.procedure.oem_business_id]: business ? (
        {procedures: business.procedures ? uniq([...business.procedures, data.result]) : [data.result]}
      ) : (
        {procedures: [data.result]}
      )
    },
    procedures: data.entities.procedures
  }
}

function* handleProcedureRequestSuccess({values:{procedure:{oem_business_id}}}, message){
  const role = yield select(getUserRole);
  var to;
  if(role === "ParlatyAdmin"){
    const business = yield select(getBusinessById(oem_business_id));
    to = `/oems/${business.oem_id}/businesses/${oem_business_id}`
  } else {
    to = `/businesses/${oem_business_id}`
  }
  yield put(push(to))
  yield put(addToast("success", message))
}

function* handleProcedureUpdateSuccess(response, {payload}){
  yield call(handleProcedureRequestSuccess, payload, `Procedure was successfully updated.`);
}

function* handleProcedureCreateSuccess(response, {payload}){
  yield call(handleProcedureRequestSuccess, payload, `Procedure '${payload.values.procedure.name}' was successfully added.`);
}

const makeStep = (stepId, values) => {
  const step = {}
  if(values[`steps[${stepId}].title`]) step.title = values[`steps[${stepId}].title`]
  if(values[`steps[${stepId}].spoken`]) step.spoken = values[`steps[${stepId}].spoken`]
  if(values[`steps[${stepId}].note`]) step.note = values[`steps[${stepId}].note`]
  if(values[`steps[${stepId}].time`]) step.time = values[`steps[${stepId}].time`]
  if(values[`steps[${stepId}].mode`]) step.mode = values[`steps[${stepId}].mode`]
  if(values[`steps[${stepId}].safety`]) step.safety = values[`steps[${stepId}].safety`]
  if(values[`steps[${stepId}].location`]) step.location = values[`steps[${stepId}].location`]
  if(values[`steps[${stepId}].device`]) step.device = values[`steps[${stepId}].device`]
  if(values[`steps[${stepId}].parameter_name`]) step.parameter_name = values[`steps[${stepId}].parameter_name`]
  if(values[`steps[${stepId}].parameter_value_8_pack`]) step.parameter_value_8_pack = values[`steps[${stepId}].parameter_value_8_pack`]
  const visual = values[`steps[${stepId}].visual`];
  if(values[`steps[${stepId}].visual`]){
    step.visuals =  [values[`steps[${stepId}].visual`]];
    step.has_visual = true;
  }
  return step;
}
export function* createProcedureSaga(action){
  const stepIds = yield select(getStepForms),
        values = {
          procedure: {
            name: action.payload.values.name,
            description: action.payload.values.description,
            author: action.payload.values.author,
            oem_business_id: action.payload.values.oem_business_id,
          }
        }

  if(stepIds.length > 0){
    values.steps = stepIds.map(step => makeStep(step, action.payload.values))
  }
  action.payload.values = values
  yield call(multipostSaga,action, getNewEntitiesFromProcedure, handleProcedureCreateSuccess);
}

const normalizeProcedure = ({steps_order, ...procedure}) => normalize(procedure, Schemas.procedure).entities
export function* updateProcedureSaga(action){
  action.payload.values = {procedure: action.payload.values}
  yield call(formSaga, "put", action, normalizeProcedure, handleProcedureUpdateSuccess);
}

function normalizeFullProcedure({procedure_id, steps, ...procedure}){
  const stepArray = []
  if(steps && steps.length){
    for (var i = 0; i < steps.length; i++) {
      const { visual, ...step } = steps[i];
      if(visual){
        stepArray.push({...step, number: i+1, visual})
      } else {
        step.number = i+1;
        stepArray.push(step)
      }
    }
  }
  return normalize({
    ...procedure,
    id: procedure_id,
    steps: stepArray
  }, Schemas.procedure).entities
}

export function* fetchProcedureSaga(action){
  yield call(getSaga, action, normalizeFullProcedure);
}
