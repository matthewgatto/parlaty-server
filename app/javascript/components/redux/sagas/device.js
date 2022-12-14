import { put, select, call, fork, take } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { normalize } from 'normalizr';
import { addToast } from '@actions/toast';
import { setModal } from '@actions/modal';
import { getActionForms } from '@selectors/action';
import { getProcedureById } from '@selectors/procedure';
import { getDeviceById } from '@selectors/device';
import { deviceSchema } from '@utils/validation';
import {makeObjRequest} from '@utils/uploader';
import Schemas from '@utils/models';
import API from '@utils/API';
import * as utils from '@utils';

const validateDevice = async (device) => {
  try {
    await deviceSchema.validate(device, {abortEarly: false, stripUnknown: true});
  } catch (e) {
    const fieldErrors = {};
    for (let i = 0; i < e.inner.length; i++) {
      const [left,rest] = e.inner[i].path.split('[');
      let fieldName = e.inner[i].path;
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

export function* createDeviceSaga({type,payload:{values,formKey}}){
  try {
    const device = yield call(setDeviceValues, values, "create");
    const response = yield call(makeObjRequest, {device}, "/devices", "post", "device");
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
  try {
    const device = yield call(setDeviceValues, values, "update");
    const response = yield call(makeObjRequest, {device}, `/devices/${id}`, "put", "device");
    const entities = normalize(response, [Schemas.device]).entities;
    yield put({type: `${type}__SUCCESS`, payload: entities})
    yield put(setModal())
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

export function* createProcedureDeviceSaga({type, payload:{values,id,formKey}}){
  try {
    const device = yield call(setDeviceValues, values, "create_by_procedure");
    const response = yield call(makeObjRequest, {device}, "/devices", "post", "device");
    const procedure = yield select(getProcedureById(values.procedure_id));
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
    const payload = {device_id: action.payload.device_id, procedure_id: action.payload.procedure_id}
    const pathname = yield select(({router}) => router.location.pathname);
    const splitPath = pathname.split('/');
    if(splitPath[1] !== "devices"){
      payload.steps = yield call(setStepsWithDevices, action);
    }
    yield put({type: "DELETE_DEVICE_REQUEST__SUCCESS", payload})
    yield put(setModal());
    yield put(addToast("success", "Device was successfully deleted."))
  } catch (e) {
      console.log("deleteDeviceSaga ERROR", e);
  }
}

function* setStepsWithDevices(action){
  const procedure = yield select(getProcedureById(action.payload.procedure_id));
  const device_id = action.payload.device_id;
  const steps = yield select(state => state.steps)
  const stepsWithDevices = {};
  for (let i = 0; i < procedure.steps.length; i++) {
    const step = steps.byId[procedure.steps[i]]
    if(step.device_id){
      const stepDevice = yield select(getDeviceById(step.device_id));
      if(stepDevice.parent_id === device_id || step.device_id === device_id){
        stepsWithDevices[procedure.steps[i]] = {...step,device_id: null,device:null}
      }
    }
  }
  return stepsWithDevices;
}

function* setDeviceValues(values, actionType){
  const actionIds = yield select(getActionForms),
    device = {
      name: values.name,
      machine_tag: values.machine_tag
    };
  if(actionType === "create_by_procedure") device.procedure_id = values.procedure_id
  if(actionIds.length > 0){
    device.actions = actionIds.map(action =>
      actionType === "create" || actionType === "create_by_procedure" ?
      utils.makeAction(values, `actions[${action.formId}].`) :
      ({...utils.makeAction(values, `actions[${action.formId}].`), id: action.id})
    );
  }
  yield call(validateDevice, device);
  return device;
}

// export function* getFreshDeviceData(){
//   const loggedInFromStorage = yield select(({auth}) => auth && auth.jwt)
//   if(!loggedInFromStorage){
//     yield take("CREATE_AUTH_REQUEST__SUCCESS")
//   }
//   yield call(deviceListSaga, {type: "FETCH_DEVICES_REQUEST"})
// }

// function* makeDeviceFromValues(values, id){
//   const actionIds = yield select(getActionForms),
//     device = {
//       name: values.name
//     }
//   if(actionIds.length > 0){
//     device.actions = actionIds.map(action => utils.makeAction(values, `actions[${action.formId}].`))
//   }
//   return device;
// }

// function* deviceFormSaga(type, formKey, values, alert, id){
//   try {
//     const device = yield call(makeDeviceFromValues, values, id)
//     yield call(validateDevice, device)
//     const response = yield call(
//       id ? API.put : API.post,
//       id ? `/devices/${id}` : "/devices",
//       {device}
//     )
//     yield put({type: `${type}__SUCCESS`, payload: normalize(response, Schemas.device).entities})
//     yield put(push("/devices"))
//     yield put(addToast("success", alert))
//   } catch (e) {
//     console.log("deviceFormSaga ERROR", e);
//     if(e.type === "VALIDATION_FAILURE"){
//       yield put({type: `${type}__FAILURE`, payload: {formKey, errors:{fieldErrors: e.fieldErrors}}})
//     } else {
//       yield put({type: `${type}__FAILURE`, payload: {formKey, errors:{formError: "An unexpected error has occurred"}}})
//     }
//   }
// }
