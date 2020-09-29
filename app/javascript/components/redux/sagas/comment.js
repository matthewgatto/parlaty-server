import { call, put } from 'redux-saga/effects';
import API from '@utils/API';
import { normalize } from 'normalizr';
import Schemas from '@utils/models';
import { setModal } from '@actions/modal';
import { addToast } from '@actions/toast';

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
  try {
    yield call(API.post, `/comments/delete_all`, {step_id: payload.stepId});
    yield put({type: `${type}__SUCCESS`, payload});
    yield put(setModal());
    yield put(addToast("success", "Comments was successfully deleted."))
  } catch (e) {
    console.log("deleteAllComments ERROR", e);
    yield put({type: `${type}__FAILURE`, payload: {formKey: payload.formKey, errors:{formError: "An unexpected error has occurred"}}})
  }
}

export function* makeReaded({type, payload}){
  try {
    const response = yield call(API.post, `/comments/${payload.id}/readed`);
    yield put({type: `${type}__SUCCESS`, payload: {commentId: payload.id, stepId: payload.stepId, has_new_comments: response.has_new_comments} })
  } catch (e) {
    console.log("makeReaded ERROR", e);
    yield put({type: `${type}__FAILURE`, payload: {formKey: payload.formKey, errors:{formError: "An unexpected error has occurred"}}})
  }
}
