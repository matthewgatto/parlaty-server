import { put, select, call, fork, take } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import uniq from 'lodash/uniq';
import { normalize } from 'normalizr';
import { addToast } from '@actions/toast';
import { setModal } from '@actions/modal';
import { getActionForms } from '@selectors/action';
import { getProcedureById } from '@selectors/procedure';
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


function* makeDeviceFromValues(values, id){
  const actionIds = yield select(getActionForms),
        device = {
          name: values.name
        }
  if(actionIds.length > 0){
    device.actions = actionIds.map(action => utils.makeAction(values, `actions[${action.formId}].`))
  }
  return device;
}

function* deviceFormSaga(type, formKey, values, alert, id){
  try {
    const device = yield call(makeDeviceFromValues, values, id)
    yield call(validateDevice, device)
    const response = yield call(
      id ? API.put : API.post,
      id ? `/devices/${id}` : "/devices",
      {device}
    )
    yield put({type: `${type}__SUCCESS`, payload: normalize(response, Schemas.device).entities})
    yield put(push("/devices"))
    yield put(addToast("success", alert))
  } catch (e) {
    console.log("deviceFormSaga ERROR", e);
    if(e.type === "VALIDATION_FAILURE"){
      yield put({type: `${type}__FAILURE`, payload: {formKey, errors:{fieldErrors: e.fieldErrors}}})
    } else {
      yield put({type: `${type}__FAILURE`, payload: {formKey, errors:{formError: "An unexpected error has occurred"}}})
    }
  }
}

export function* createDeviceSaga({type,payload:{values,formKey}}){
  //yield call(deviceFormSaga, type, formKey, values, "Device successfully created.")
  try {
    const actionIds = yield select(getActionForms),
          device = {
            name: values.name
          }
    if(actionIds.length > 0){
      device.actions = actionIds.map(action => utils.makeAction(values, `actions[${action.formId}].`))
    }
    yield call(validateDevice, device)
    const response = yield call(
      API.post,
      "/devices",
      {device}
    )
    yield put({type: `${type}__SUCCESS`, payload: normalize(response, Schemas.device).entities})
    yield put(push("/devices"))
    yield put(addToast("success", alert))
  } catch (e) {
    console.log("deviceFormSaga ERROR", e);
    if(e.type === "VALIDATION_FAILURE"){
      yield put({type: `${type}__FAILURE`, payload: {formKey, errors:{fieldErrors: e.fieldErrors}}})
    } else {
      yield put({type: `${type}__FAILURE`, payload: {formKey, errors:{formError: "An unexpected error has occurred"}}})
    }
  }
}

export function* updateDeviceSaga({type,payload:{formKey,id,values}}){
  //yield call(deviceFormSaga, type, formKey, values, "Device successfully updated.", id)
  try {
    const actionIds = yield select(getActionForms),
          device = {
            name: values.name
          }
    if(actionIds.length > 0){
      device.actions = actionIds.map(action => ({...utils.makeAction(values, `actions[${action.formId}].`), id: action.id}))
    }
    yield call(validateDevice, device)
    const response = yield call(API.put, `/devices/${id}`, {device})
    yield put({type: `${type}__SUCCESS`, payload: normalize(response, Schemas.device).entities})
    const pathname = yield select(({router}) => router.location.pathname);
    if(pathname.split('/')[1] === "devices"){
      yield put(push("/devices"))
    } else {
      yield put(setModal())
    }
    yield put(addToast("success", "Device successfully updated."))
  } catch (e) {
    console.log("deviceFormSaga ERROR", e);
    if(e.type === "VALIDATION_FAILURE"){
      yield put({type: `${type}__FAILURE`, payload: {formKey, errors:{fieldErrors: e.fieldErrors}}})
    } else {
      yield put({type: `${type}__FAILURE`, payload: {formKey, errors:{formError: "An unexpected error has occurred"}}})
    }
  }
}

export function* deviceListSaga(action){
  try {
    const response = yield call(
      API.get,
      "/devices"
    );
    yield put({type: `${action.type}__SUCCESS`, payload: normalize(response.devices, [Schemas.device]).entities})
  } catch (e) {
    console.log("deviceListSaga ERROR", e);
  }
}

export function* getFreshDeviceData(){
  const loggedInFromStorage = yield select(({auth}) => auth && auth.jwt)
  if(!loggedInFromStorage){
    yield take("CREATE_AUTH_REQUEST__SUCCESS")
  }
  yield call(deviceListSaga, {type: "FETCH_DEVICES_REQUEST"})
}


export function* createProcedureDeviceSaga({type, payload:{values,id,formKey}}){
  try {
    const actionIds = yield select(getActionForms),
          device = { name: values.name, procedure_id: values.procedure_id }

    if(actionIds.length > 0){
      device.actions = actionIds.map(action => utils.makeAction(values, `actions[${action.formId}].`))
    }
    yield call(validateDevice, device)
    const procedure = yield select(getProcedureById(values.procedure_id));
    const response = yield call(
      API.post,
      "/devices",
      {device}
    );
    const newState = yield call(normalize,{...procedure, devices: procedure.devices ? [...procedure.devices, response] : [response]}, Schemas.procedure)
    yield put({type: `${type}__SUCCESS`, payload: newState.entities})
  } catch (e) {
    console.log("deviceFormSaga ERROR", e);
    if(e.type === "VALIDATION_FAILURE"){
      yield put({type: `${type}__FAILURE`, payload: {formKey, errors:{fieldErrors: e.fieldErrors}}})
    } else {
      yield put({type: `${type}__FAILURE`, payload: {formKey, errors:{formError: "An unexpected error has occurred"}}})
    }
  }
}

export function* deleteDeviceSaga(action){
  try {
    yield call(API.delete, `/devices/${action.payload.device_id}`);
    yield put({type: "DELETE_DEVICE_REQUEST__SUCCESS", payload: {device_id: action.payload.device_id, procedure_id: action.payload.procedure_id}})
    yield put(setModal());
    yield put(addToast("success", "Device was successfully deleted."))
  } catch (e) {
      console.log("deleteDeviceSaga ERROR", e);
  }
}
