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
    if(response.error){
      yield put({type: `${action.type}__FAILURE`, payload: {formKey: action.payload.formKey, errors:{fieldErrors: response.error}}})
    }else{
      if(normalize){
        const updResponse = normalizeSuccessResponse(response, action.payload.values);
        const payload = yield call(normalize, updResponse, action);
        yield put({
          type: `${action.type}__SUCCESS`,
          payload: payload,
        })
      }
      if(cb) yield call(cb, response, action)
    }
  } catch (e) {
    console.log("e", e);
    var formError = "An unexpected error has occurred"
    if(e.formError) formError = e.formError;
    else if(e === 401) formError = "Invalid login credentials";
    yield put({type: `${action.type}__FAILURE`, payload: {formKey: action.payload.formKey, errors:{formError}}})
  }
}

export function* postSaga(action, normalize, cb){
  try {
    const response = yield call(API.post, action.payload.url, action.payload.values);
    if(response.error){
      yield put({type: `${action.type}__FAILURE`, payload: {formKey: action.payload.formKey, errors: {formError: response.error}}})
    }else{
      if(normalize){
        const payload = yield call(normalize, response, action);
        yield put({
          type: `${action.type}__SUCCESS`,
          payload
        })
      }
      if(cb) yield call(cb, response, action)
    }
  } catch (e) {
    let formError = "An unexpected error has occurred"
    if(e.formError) formError = e.formError;
    else if(e === 401) formError = "Invalid login credentials";
    yield put({type: `${action.type}__FAILURE`, payload: {formKey: action.payload.formKey, errors:{formError}}})
  }
}

function normalizeSuccessResponse(response, action) {
  if(Object.keys(response).length === 0) return action;
  if(Object.keys(response).length === 1 && typeof(response.id) !== 'undefined' && response.id != null) return combineValues(response, action);
  return response;
}

function combineValues(response, action){
  const summary = {...response, ...action};
  return summary;
}
