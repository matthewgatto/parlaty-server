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
import { cleanStepParams, makeStep } from '@sagas/step';

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
    values.steps = stepIds.map(stepId => cleanStepParams(makeStep(action.payload.values, `steps[${stepId}].`)))
  }
  action.payload.values = values
  yield call(multipostSaga,action, getNewEntitiesFromProcedure, handleProcedureCreateSuccess);
}

const normalizeProcedure = ({steps_order, ...procedure}) => normalize(procedure, Schemas.procedure).entities
export function* updateProcedureSaga(action){
  action.payload.values = {procedure: action.payload.values}
  yield call(formSaga, "put", action, normalizeProcedure, handleProcedureUpdateSuccess);
}

const normalizeFullProcedure = ({procedure_id, steps, ...procedure}) => normalize({
  ...procedure,
  id: procedure_id,
  steps
}, Schemas.procedure).entities

export function* fetchProcedureSaga(action){
  yield call(getSaga, action, normalizeFullProcedure);
}
