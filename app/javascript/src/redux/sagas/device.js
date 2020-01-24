import { put, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import uuid from 'uuid/v4';
import { addToast } from '../actions/toast';
import { getActionForms } from '../selectors/action';

const makeAction = (id, device_id, values) => {
  const action = {id, device_id }
  if(values[`actions[${id}].name`]) action.name = values[`actions[${id}].name`]
  return action;
}
export function* createDeviceSaga({payload:{values}}){
  const device_id = uuid(),
        actionIds = yield select(getActionForms),
        entities = {},
        newDevice = {
          id: device_id,
          name: values.name
        }
  if(actionIds.length > 0){
    newDevice.actions = actionIds
    const actions = {};
    for (var i = 0; i < actionIds.length; i++) {
      actions[actionIds[i]] = makeAction(actionIds[i], device_id, values)
    }
    entities.actions = actions
  }
  entities.devices = {[device_id]: newDevice}
  yield put({type: "CREATE_DEVICE_REQUEST__SUCCESS", payload: entities})
  yield put(push("/devices"))
  yield put(addToast("success", "Device successfully created."))
}

export function* updateDeviceSaga({payload:{id,values}}){
  /*
  const newDevice = {id: payload.id, name: payload.values.name}
  const actionIds = yield select(getActionFields)
  if(actionIds.length > 0){
    newDevice.actions = actionIds.map(id => payload.values[`actions[${id}]`])
  }
  yield put({type: "UPDATE_DEVICE_REQUEST__SUCCESS", payload: newDevice})
  */
  const actionIds = yield select(getActionForms),
        entities = {},
        newDevice = {
          id,
          name: values.name
        }
  if(actionIds.length > 0){
    newDevice.actions = actionIds
    const actions = {};
    for (var i = 0; i < actionIds.length; i++) {
      actions[actionIds[i]] = makeAction(actionIds[i], id, values)
    }
    entities.actions = actions
  }
  entities.devices = {[id]: newDevice}
  yield put({type: "UPDATE_DEVICE_REQUEST__SUCCESS", payload: entities})
  yield put(push("/devices"))
  yield put(addToast("success", "Device successfully updated."))
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
