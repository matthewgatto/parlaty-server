import { call,put,select } from 'redux-saga/effects';
import uuid from 'uuid/v4'
import { push } from 'connected-react-router';
import { normalize } from 'normalizr';
import {getSaga} from './fetch';
import {formSaga,pushAndNotify} from './form';
import { addToast } from '@actions/toast';
import {getOEMById} from '@selectors/oem';
import {getBusinessById} from '@selectors/business';
import Schemas from '@utils/models';
import API from '@utils/API';


const normalizeBusiness = (response,{payload:{id}}) => normalize({oem_business_id: id, ...response}, Schemas.business).entities
function* normalizeOem(response,action){
  const oem = yield select(getOEMById(action.payload.values.oem_id));
  return (oem && oem.businesses) ? (
    normalize({...oem, businesses: [...oem.businesses, {oem_business_id: response.oem_business.id,...action.payload.values,...response.oem_business}]}, Schemas.oem).entities
  ) : (
    normalize({oem_business_id: response.oem_business.id, ...action.payload.values, ...response.oem_business}, Schemas.business).entities
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
  yield call(formSaga, "post", action, normalizeOem, handleBusinessCreateSuccess);
}

export function* deleteCategorySaga(action){
  try {
    const url = yield select(({router}) => router.location.pathname)
    const splitUrl = url.split("/");
    var oem_id;
    if(splitUrl[0] === "oems"){
      oem_id = splitUrl[1]
    } else {
      oem_id = yield select(({auth}) => auth.oem)
    }
    yield call(API.delete, `/oem_businesses/${action.payload}`);
    yield put({type: `${action.type}__SUCCESS`, payload: {category_id: action.payload, oem_id}})
    yield put(push(splitUrl.slice(0,-2).join('/')))
    yield put(addToast("success", "Category was successfully deleted."))
  } catch (e) {
      console.log("deleteProcedureSaga ERROR", e);
  }
}
