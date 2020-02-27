import { put, select, call, fork, take } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import uniq from 'lodash/uniq';
import { normalize } from 'normalizr';
import { addToast } from '@actions/toast';
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

const makeActionMappingFunc = (values, root, id) => id ? id => ({id: id, ...utils.makeAction(values, `actions[${id}].`)}) : id => utils.makeAction(values, `actions[${id}].`)

function* deviceFormSaga(method, type, formKey, id, values, alert){
  try {
    const actionIds = yield select(getActionForms),
          device = {
            name: values.name
          }
    if(actionIds.length > 0){
      device.actions = actionIds.map(makeActionMappingFunc(values, `actions[${id}].`, id))
    }
    yield call(validateDevice, device)
    const response = yield call(deviceRequest, method, device, id);
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
  yield call(deviceFormSaga, 'multipost', type, formKey, undefined, values, "Device successfully created.")
}

export function* updateDeviceSaga({type,payload:{formKey,id,values}}){
  yield call(deviceFormSaga, 'multiput', type, formKey, id, values, "Device successfully updated.")
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
          device = {
            id,
            name: values.name
          }
    if(actionIds.length > 0){
      device.actions = actionIds.map(makeActionMappingFunc(values, `actions[${id}].`, id))
    }
    yield call(validateDevice, device)
    //const response = yield call(deviceRequest, method, device, id);
    const procedure = yield select(getProcedureById(values.procedure_id)),
          data = normalize(device, Schemas.device);
    yield put({type: `${type}__SUCCESS`, payload: {
      procedures: {
        [values.procedure_id]: procedure ? (
          {devices: procedure.devices ? uniq([...procedure.devices, data.result]) : [data.result]}
        ) : (
          {devices: [data.result]}
        )
      },
      ...data.entities
    }})
    //yield put(push("/devices"))
    //yield put(addToast("success", alert))
  } catch (e) {
    console.log("deviceFormSaga ERROR", e);
    if(e.type === "VALIDATION_FAILURE"){
      yield put({type: `${type}__FAILURE`, payload: {formKey, errors:{fieldErrors: e.fieldErrors}}})
    } else {
      yield put({type: `${type}__FAILURE`, payload: {formKey, errors:{formError: "An unexpected error has occurred"}}})
    }
  }
}
