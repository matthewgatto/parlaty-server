import { call, select, put } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import uniq from 'lodash/uniq';
import {formSaga,multipostSaga} from './form';
import {getSaga} from './fetch';
import { push } from 'connected-react-router';
import { addToast } from '../actions/toast';
import Schemas from '../../utils/models';

const getBusinessMap = ({businesses:{byId}}) => byId
function* getNewEntitiesFromProcedure(response,{payload:{values}}){
  const businesses = yield select(getBusinessMap);
  const business = businesses[values.procedure.oem_business_id];
  const data = normalize({id: response.id, name: values.procedure.name}, Schemas.procedure);
  const returnData = {
    businesses: {
      [values.procedure.oem_business_id]: business ? (
        {procedures: business.procedures ? uniq([...business.procedures, data.result]) : [data.result]}
      ) : (
        {procedures: [data.result]}
      )
    },
    procedures: data.entities.procedures
  }
  return returnData
}

const checkIfAdmin = ({auth}) => (auth.roleable_type ===  "ParlatyAdmin")
function* handleProcedureRequestSuccess({values:{procedure:{oem_business_id}}}, message){
  var to;
  if(yield select(checkIfAdmin)){
    const businesses = yield select(getBusinessMap);
    to = `/oem/${businesses[oem_business_id].oem_id}/business/${oem_business_id}`
  } else {
    to = `/business/${oem_business_id}`
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
  if(values[`steps[${stepId}].time`]) step.time = values[`steps[${stepId}].time`]
  if(values[`steps[${stepId}].mode`]) step.mode = values[`steps[${stepId}].mode`]
  //if(values[`steps[${stepId}].skip`]) step.skip = values[`steps[${stepId}].skip`]
  if(values[`steps[${stepId}].location`]) step.location = values[`steps[${stepId}].location`]
  if(values[`steps[${stepId}].device`]) step.device = values[`steps[${stepId}].device`]
  if(values[`steps[${stepId}].parameter_name`]) step.parameter_name = values[`steps[${stepId}].parameter_name`]
  const image = values[`steps[${stepId}].image`];
  if(values[`steps[${stepId}].image`]){
    step.visuals =  [values[`steps[${stepId}].image`]];
    step.has_visual = true;
  }
  return step;
}
export function* createProcedureSaga(action){
  const stepIds = yield select(({steps}) => steps.forms);
  const values = {
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
        stepArray.push({...step, number: i+1, image: visual})
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
