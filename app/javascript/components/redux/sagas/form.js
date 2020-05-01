import { call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import API from '@utils/API';
import * as utils from '@utils';
import { addToast } from '@actions/toast';

export const pushAndNotify = (to,message) => (function*(){
  yield put(push(to))
  yield put(addToast("success", message))
})

export function* formSaga(method, action, normalize, cb){
  try {
    const response = yield call(API[method], action.payload.url, action.payload.values);
    if(normalize){
      const payload = yield call(normalize, response, action);
      yield put({
        type: `${action.type}__SUCCESS`,
        payload
      })
    }
    if(cb) yield call(cb, response, action)
  } catch (e) {
    console.log("e", e);
    var formError = "An unexpected error has occurred"
    if(e.formError) formError = e.formError;
    else if(e === 401) formError = "Invalid login credentials";
    yield put({type: `${action.type}__FAILURE`, payload: {formKey: action.payload.formKey, errors:{formError}}})
  }
}

export function* multipostSaga(action, normalize, cb){
  try {
    const formData = utils.objectToFormData(action.payload.values)
    const response = yield call(API.multipost, action.payload.url, formData);
    if(normalize){
      const payload = yield call(normalize, response, action);
      yield put({
        type: `${action.type}__SUCCESS`,
        payload
      })
    }
    if(cb) yield call(cb, response, action)
  } catch (e) {
    var formError = "An unexpected error has occurred"
    if(e.formError) formError = e.formError;
    else if(e === 401) formError = "Invalid login credentials";
    yield put({type: `${action.type}__FAILURE`, payload: {formKey: action.payload.formKey, errors:{formError}}})
  }
}
