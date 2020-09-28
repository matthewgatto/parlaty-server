import { call, put, select, all, fork, take } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import {getProcedureById} from '@selectors/procedure';
import {getStepFormData, getStepById, getStepsByIds} from '@selectors/comments';
import {getDeviceById} from '@selectors/device';
import * as utils from '@utils';
import { stepSchema } from '@utils/validation';
import Schemas from '@utils/models';
import API from '@utils/API';
import {makeObjRequest} from '@utils/uploader';
import {STEP_SAVE_REQUEST__SUCCESS, UPDATE_LOOPED_STEPS} from '@types/comments';

// import {updateStepsByLoop} from "./step";

export function* deleteComment({type, payload}){
  console.log({type, payload});
  debugger;
  try {
    // yield call(API.delete, `/comments/${payload.id}`);
    // const step = yield select(getStepById(payload.step_id));
    // yield put({type: `${type}__SUCCESS`, payload});
    // yield call(update, procedure);
    // yield call(updateStepsByLoop, procedure);
  } catch (e) {

  }
}

export function* deleteAllComments({type, payload}){
  console.log({type, payload});
  debugger;
  try {
    // yield call(API.delete, `/comments/${payload.id}`);
    // const step = yield select(getStepById(payload.step_id));
    // yield put({type: `${type}__SUCCESS`, payload});
    // yield call(update, procedure);
    // yield call(updateStepsByLoop, procedure);
  } catch (e) {

  }
}

export function* makeRead({type, payload}){
  // {type,payload:{formKey,id,values}}
  console.log({type, payload});
  debugger;
  try {
    // const device = yield call(setDeviceValues, values, "update");
    // const response = yield call(makeObjRequest, {device}, `/devices/${id}`, "put", "device");
    // const entities = normalize(response, [Schemas.device]).entities;
    // yield put({type: `${type}__SUCCESS`, payload: entities})
    // yield put(setModal())
    // yield put(addToast("success", "Device successfully updated."))
  } catch (e) {
    // console.log("deviceFormSaga ERROR", e);
    // if(e.type === "VALIDATION_FAILURE"){
    //   yield put({type: `${type}__FAILURE`, payload: {formKey, errors:{fieldErrors: e.fieldErrors}}})
    // } else {
    //   yield put({type: `${type}__FAILURE`, payload: {formKey, errors:{formError: "An unexpected error has occurred"}}})
    // }
  }
}
