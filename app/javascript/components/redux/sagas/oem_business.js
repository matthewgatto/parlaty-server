import { call,put,select } from 'redux-saga/effects';
import uuid from 'uuid/v4'
import { push } from 'connected-react-router';
import { normalize } from 'normalizr';
import {getSaga} from './fetch';
import {formSaga,pushAndNotify} from './form';
import { addToast } from '@actions/toast';
import {getOemById} from '@selectors/oem';
import {getOemBusinessById} from '@selectors/oem_business';
import Schemas from '@utils/models';
import API from '@utils/API';
  import {updateProceduresCountInOem} from '@utils';

const normalizeOemBusiness = (response,{payload:{id}}) => normalize({oem_business_id: id, ...response}, Schemas.oem_business).entities
function* normalizeOem(response,action){
  const oem = yield select(getOemById(action.payload.values.oem_id));
  return (oem && oem.oem_businesses) ? (
    normalize({...oem, oem_businesses: [...oem.oem_businesses, {oem_business_id: response.oem_business.id,...action.payload.values,...response.oem_business}]}, Schemas.oem).entities
  ) : (
    normalize({oem_business_id: response.oem_business.id, ...action.payload.values, ...response.oem_business}, Schemas.oem_business).entities
  )
}

export function* oemBusinessProceduresSaga(action){
  yield call(getSaga, action, normalizeOemBusiness);
}

function* handleOemBusinessCreateSuccess(response, action){
  const url = yield select(({router}) => router.location.pathname),
        to = url.split("/").slice(0,-1).join('/')+"/"+response.oem_business.id,
        pushAndNotifyFunc = pushAndNotify(to, "Site was successfully added.")
  yield call(pushAndNotifyFunc)
}

export function* createOemBusinessSaga(action){
  yield call(formSaga, "post", action, normalizeOem, handleOemBusinessCreateSuccess);
}

export function* deleteOemBusinessSaga(action){
  try {
    const url = yield select(({router}) => router.location.pathname)
    const splitUrl = url.split("/");
    const oem_business = yield select(getOemBusinessById(action.payload));
    yield call(API.delete, `/oem_businesses/${action.payload}`);
    const oem = yield select(getOemById(oem_business.oem_id));
    const normalizedResponse = {oem_business_id: action.payload, oem_id: oem_business.oem_id, ...updateProceduresCountInOem("delete", oem, oem_business.procedures.length)};
    yield put({type: `${action.type}__SUCCESS`, payload: normalizedResponse})
    yield put(push(splitUrl.slice(0,-2).join('/')))
    yield put(addToast("success", "Site was successfully deleted."))
  } catch (e) {
      console.log("deleteProcedureSaga ERROR", e);
  }
}
