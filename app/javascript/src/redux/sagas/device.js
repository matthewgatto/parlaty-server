import { put, select, call, fork } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import uuid from 'uuid/v4';
import { normalize } from 'normalizr';
import { addToast } from '@actions/toast';
import { getActionForms } from '@selectors/action';
import { deviceSchema } from '@utils/validation';
import Schemas from '@utils/models';
import API from '@utils/API';
import * as utils from '@utils';

const validateDevice = async (device) => {
  try {
    await deviceSchema.validate(device, {abortEarly: false, stripUnknown: true});
  } catch (e) {
    const fieldErrors = {};
    for (var i = 0; i < e.inner.length; i++) {
      const [left,rest] = e.inner[i].path.split('[');
      var fieldName = e.inner[i].path;
      if(left === "actions"){
        const [idx,right] = rest.split(']')
        const id = device.actions[idx].id;
        fieldName = `${left}[${id}]${right}`
      }
      fieldErrors[fieldName] = e.inner[i].message
    }
    throw {type: "VALIDATION_FAILURE", fieldErrors}
  }
}

const cleanDeviceParams = ({id,...device}) => device

function* deviceRequest(method, device, id){
  try {
    return yield call(
      API[method],
      id ? `/devices/${id}` : "/devices",
      utils.objectToFormData({device: cleanDeviceParams(device)})
    );
  } catch (e) {

  }
}

const cleanActionParams = ({id, device_id, ...action}) => action;
/*
function* deviceFormSaga(method, type, formKey, id, values, alert){
  try {
    const actionIds = yield select(getActionForms),
          device = {
            id: id ? id : uuid(),
            name: values.name
          }
    if(actionIds.length > 0){
      device.actions = actionIds.map(actionId => ({...utils.makeAction(values, `actions[${actionId}].`), id: actionId, device_id: device.id}))
    }
    yield call(validateDevice, device)
    yield fork(deviceRequest, method, device, id)
    yield put({type: `${type}__SUCCESS`, payload: normalize(device, Schemas.device).entities})
    yield put(push("/devices"))
    yield put(addToast("success", alert))
  } catch (e) {
    if(e.type === "VALIDATION_FAILURE"){
      yield put({type: `${type}__FAILURE`, payload: {formKey, errors:{fieldErrors: e.fieldErrors}}})
    } else {
      yield put({type: `${type}__FAILURE`, payload: {formKey, errors:{formError: "An unexpected error has occurred"}}})
    }
  }
}
*/

function* deviceCreateFormSaga(method, type, formKey, id, values, alert){
  try {
    const actionIds = yield select(getActionForms),
          device = {
            name: values.name
          }
    if(actionIds.length > 0){
      device.actions = actionIds.map(actionId => ({...utils.makeAction(values, `actions[${actionId}].`), id: actionId}))
    }
    yield call(validateDevice, device)
    const response = yield call(deviceRequest, method, device, id);
    yield put({type: `${type}__SUCCESS`, payload: normalize({...device, id: response.id}, Schemas.device).entities})
    yield put(push("/devices"))
    yield put(addToast("success", alert))
  } catch (e) {
    if(e.type === "VALIDATION_FAILURE"){
      yield put({type: `${type}__FAILURE`, payload: {formKey, errors:{fieldErrors: e.fieldErrors}}})
    } else {
      yield put({type: `${type}__FAILURE`, payload: {formKey, errors:{formError: "An unexpected error has occurred"}}})
    }
  }
}

function* deviceUpdateFormSaga(method, type, formKey, id, values, alert){
  try {
    const actionIds = yield select(getActionForms),
          device = {
            id: id ? id : uuid(),
            name: values.name
          }
    if(actionIds.length > 0){
      device.actions = actionIds.map(actionId => ({...utils.makeAction(values, `actions[${actionId}].`), id: actionId, device_id: device.id}))
    }
    yield call(validateDevice, device)
    yield fork(deviceRequest, method, device, id)
    yield put({type: `${type}__SUCCESS`, payload: normalize(device, Schemas.device).entities})
    yield put(push("/devices"))
    yield put(addToast("success", alert))
  } catch (e) {
    if(e.type === "VALIDATION_FAILURE"){
      yield put({type: `${type}__FAILURE`, payload: {formKey, errors:{fieldErrors: e.fieldErrors}}})
    } else {
      yield put({type: `${type}__FAILURE`, payload: {formKey, errors:{formError: "An unexpected error has occurred"}}})
    }
  }
}

export function* createDeviceSaga({type,payload:{values,formKey}}){
  yield call(deviceCreateFormSaga, 'multipost', type, formKey, undefined, values, "Device successfully created.")
}

export function* updateDeviceSaga({type,payload:{formKey,id,values}}){
  yield call(deviceUpdateFormSaga, 'multiput', type, formKey, id, values, "Device successfully updated.")
}

export function* deviceListSaga(action){
  try {
    const response = yield call(
      API.get,
      "/devices"
    );
    yield put({type: `${action.type}__SUCCESS`, payload: normalize(response, [Schemas.device]).entities})
  } catch (e) {
    console.log("deviceListSaga ERROR", e);
  }
}
