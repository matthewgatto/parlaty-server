import { call, select, put } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import uniq from 'lodash/uniq';
import {formSaga,multipostSaga} from './form';
import {getSaga} from './fetch';
import { push } from 'connected-react-router';
import { addToast } from '@actions/toast';
import { setModal } from '@actions/modal';
import { getBusinessById } from '@selectors/business';
import { getProcedureById } from '@selectors/procedure';
import { getUserRole } from '@selectors/auth';
import { getStepForms } from '@selectors/step';
import Schemas from '@utils/models';
import { cleanStepParams } from '@sagas/step';
import API from '@utils/API';
import * as utils from '@utils';

function* getNewEntitiesFromProcedure(response,{payload:{values}}){
  const business = yield select(getBusinessById(values.procedure.oem_business_id))
  return business ? (
    normalize({...business, procedures: business.procedures ? [...business.procedures,{...response, name: values.procedure.name}] : [{...response, name: values.procedure.name}]}, Schemas.business).entities
  ) : (
    normalize({...response,name: values.procedure.name}, Schemas.procedure).entities
  )
}

function* handleProcedureRequestSuccess({values:{procedure:{oem_business_id}}}, message){
  const url = yield select(({router}) => router.location.pathname),
        to = url.split("/").slice(0,-3).join('/');
  yield put(push(to))
  yield put(addToast("success", message))
}

function* handleProcedureUpdateSuccess(response, {payload}){
  yield call(handleProcedureRequestSuccess, payload, `Procedure was successfully updated.`);
}

function* handleProcedureCreateSuccess(response, {payload}){
  try {
    //yield call(handleProcedureRequestSuccess, payload, `Procedure '${payload.values.procedure.name}' was successfully added.`);
    const role = yield select(getUserRole);
    var to;
    if(role === "ParlatyAdmin"){
      to = `/oems/${payload.values.oem_id}/businesses/${payload.values.procedure.oem_business_id}/procedures/${response.id}/add-devices`
    } else {
      to = `/businesses/${payload.values.procedure.oem_business_id}/procedures/${response.id}/add-devices`
    }
    yield put(push(to))
  } catch (e) {
    console.log("ERROR", e);
  }

}

export function* createProcedureSaga(action){
  try {
    yield call(
      multipostSaga,
      {
        ...action,
        payload: {
          ...action.payload,
          values: {
            oem_id: action.payload.values.oem_id,
            procedure: {
              name: action.payload.values.name,
              description: action.payload.values.description,
              author: action.payload.values.author,
              oem_business_id: action.payload.values.oem_business_id,
            }
          }
        }
      },
      getNewEntitiesFromProcedure,
      handleProcedureCreateSuccess
    );
  } catch (e) {
    console.log("e",e);
  }

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

export function* deleteProcedureSaga(action){
  try {
    const procedure = yield select(getProcedureById(action.payload))
    yield call(API.delete, `/procedures/${action.payload}`);
    yield put({type: "DELETE_PROCEDURE_REQUEST__SUCCESS", payload: {procedure_id: action.payload, oem_businesses: procedure.oem_businesses}})
    yield call(handleProcedureRequestSuccess,{values:{procedure}}, "Procedure was successfully deleted.")
  } catch (e) {
      console.log("deleteProcedureSaga ERROR", e);
  }
}

export function* copyProcedureSaga({payload:{formKey,values:{oem_business_id,...procedure},procedure_id}}){
  try {
    var body = {name: procedure.name};
    if(procedure.description){
      body.description = procedure.description
    }
    const response = yield call(API.post, `/procedures/${procedure_id}/copy`,body)
    const business = yield select(getBusinessById(oem_business_id))
    const normalizedData = business ? (
      normalize({...business, procedures: business.procedures ? [...business.procedures,{name: procedure.name, ...response}] : [{name: procedure.name,...response}]}, Schemas.business).entities
    ) : (
      normalize({name: procedure.name, ...response}, Schemas.procedure).entities
    )
    yield put({type: "CREATE_PROCEDURE_REQUEST__SUCCESS", payload: normalizedData});
    yield call(handleProcedureRequestSuccess,{values:{procedure: normalizedData.procedures[response.id]}}, "Procedure was successfully copied")
  } catch (e) {
    console.log("copyProcedureSaga ERROR", e);
    yield put({type: "CREATE_PROCEDURE_REQUEST__FAILURE", payload: {formKey,errors:{formError: "Unable to copy procedure."}}})
    yield put(setModal())
  }
}

export function* updateCategoriesSaga(action){
  try {
    const {procedures,businesses} = yield select(({procedures,businesses}) => ({procedures,businesses}));
    const procedure = procedures.byId[action.payload.id];
    const oem_businesses = [];
    const categories = []
    for (var category in action.payload.values) {
      if (action.payload.values.hasOwnProperty(category) && action.payload.values[category] === true){
        categories.push(category)
        if(businesses.byId[category] && businesses.byId[category].procedures){
          oem_businesses.push(category)
        }
      }
    }
    const addedCategories = oem_businesses.filter(x => !procedure.oem_businesses.includes(x));
    const removedCategories = procedure.oem_businesses.filter(x => businesses.byId[x] && businesses.byId[x].procedures && !oem_businesses.includes(x));
    const updatedBusinesses = {};
    for (var i = 0; i < addedCategories.length; i++) {
      const businessToAddTo = businesses.byId[addedCategories[i]]
      updatedBusinesses[addedCategories[i]] = {...businessToAddTo, procedures: [...businessToAddTo.procedures, action.payload.id]}
    }
    for (var i = 0; i < removedCategories.length; i++) {
      const businessToRemoveFrom = businesses.byId[removedCategories[i]]
      updatedBusinesses[removedCategories[i]] = {...businessToRemoveFrom, procedures: businessToRemoveFrom.procedures.filter(x => x != action.payload.id)}
    }
    const response = yield call(API.put, `/procedures/${action.payload.id}/update_categories`,{categories})
    yield put(setModal())
    yield put(addToast("success", "Procedure categories successfully updated."))
    yield put({type: action.type+"__SUCCESS", payload: {
      businesses: updatedBusinesses,
      procedures: {
        [action.payload.id]: {...procedure, oem_businesses: categories}
      }
    }})
  } catch (e) {
    console.log("error", e);
  }

}
