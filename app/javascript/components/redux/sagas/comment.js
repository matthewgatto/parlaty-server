import { call, put } from 'redux-saga/effects';
import API from '@utils/API';
import { normalize } from 'normalizr';
import Schemas from '@utils/models';

export function* deleteComment({type, payload}){
  try {
    yield call(API.delete, `/comments/${payload.id}`);
    yield put({type: `${type}__SUCCESS`, payload});
  } catch (e) {
    console.log("deleteComment ERROR", e);
    yield put({type: `${type}__FAILURE`, payload: {formKey: payload.formKey, errors:{formError: "An unexpected error has occurred"}}})
  }
}

export function* deleteAllComments({type, payload}){
  console.log({type, payload});
  debugger;
  try {
    // yield call(API.delete, `/comments/delete_all`, {step_id: payload.stepId});
    yield put({type: `${type}__SUCCESS`, payload});
  } catch (e) {
    console.log("deleteAllComments ERROR", e);
    yield put({type: `${type}__FAILURE`, payload: {formKey: payload.formKey, errors:{formError: "An unexpected error has occurred"}}})
  }
}

export function* makeReaded({type, payload}){
  try {
    const response = yield call(API.post, `/comments/${payload.id}/readed`);
    const comment = normalize(response, Schemas.comment).entities;
    yield put({type: `${type}__SUCCESS`, payload: comment})
  } catch (e) {
    console.log("makeReaded ERROR", e);
    yield put({type: `${type}__FAILURE`, payload: {formKey: payload.formKey, errors:{formError: "An unexpected error has occurred"}}})
  }
}
