import { call,fork,put,select } from 'redux-saga/effects';
import uuid from 'uuid/v4'
import { normalize } from 'normalizr';
import {getSaga} from './fetch';
import {formSaga,pushAndNotify} from './form';
import {getOEMById} from '@selectors/oem';
import Schemas from '@utils/models';
import API from '@utils/API';


const normalizeBusiness = (response,{payload:{id}}) => normalize({oem_business_id: id, ...response}, Schemas.business).entities
function* normalizeOem(response,action){
  const oem = yield select(getOEMById(action.payload.values.oem_id));
  return (oem && oem.businesses) ? (
    normalize({...oem, businesses: [...oem.businesses, {oem_business_id: response.id,...action.payload.values,...response}]}, Schemas.oem).entities
  ) : (
    normalize({oem_business_id: response.id, ...action.payload.values, response}, Schemas.business).entities
  )
}

export function* businessProceduresSaga(action){
  yield call(getSaga, action, normalizeBusiness);
}

function* handleBusinessCreateSuccess(response, action){
  const url = yield select(({router}) => router.location.pathname),
        to = url.split("/").slice(0,-1).join('/')+"/"+response.id,
        pushAndNotifyFunc = pushAndNotify(to, "Category was successfully added.")
  yield call(pushAndNotifyFunc)
}

export function* createBusinessSaga(action){
  //yield call(formSaga, "post", action, normalizeOem, handleBusinessCreateSuccess);
  const response = yield call(API.post, action.payload.url, action.payload.values)
  const oem = yield select(getOEMById(action.payload.values.oem_id));
  yield put({
    type: `${action.type}__SUCCESS`,
    payload: (oem && oem.businesses) ? (
      normalize({...oem, businesses: [...oem.businesses, {oem_business_id: response.oem_business.id,...action.payload.values,...response.oem_business}]}, Schemas.oem).entities
    ) : (
      normalize({oem_business_id: response.oem_business.id, ...action.payload.values, ...response.oem_business}, Schemas.business).entities
    )
  })
  yield call(handleBusinessCreateSuccess, response.oem_business, action)
}
