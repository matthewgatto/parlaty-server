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

export function* createDeviceSaga({type,payload:{values,formKey}}){
  yield call(deviceFormSaga, 'multipost', type, formKey, undefined, values, "Device successfully created.")
}

export function* updateDeviceSaga({type,payload:{formKey,id,values}}){
  yield call(deviceFormSaga, 'multiput', type, formKey, id, values, "Device successfully updated.")
}

export function* deviceListSaga(action){
  yield put({
    type: "FETCH_DEVICES_REQUEST__SUCCESS",
    payload: {
      devices: {
        "1": {id: "1", name: "Crank handle", actions: ["Crank Action One", "Crank Action Two", "Crank Action Three"]},
        "2": {id: "2", name: "Part with Lock", actions: ["Part Action One", "Part Action Two", "Part Action Three"]},
        "3": {id: "3", name: "Blowtorch", actions: ["Blowtorch Action One", "Blowtorch Action Two", "Blowtorch Action Three"]},
        "4": {id: "4", name: "Pressure Washer", actions: ["Pressure One", "Pressure Two", "Pressure Three"]},
        "5": {id: "5", name: "Wrench", actions: ["Wrench One", "Wrench Two", "Wrench Three"]}
      }
    }
  })
}
