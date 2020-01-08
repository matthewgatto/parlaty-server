import { put, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { addToast } from '../actions/toast';



export function* createDeviceSaga({payload:{values}}){
  const id = new Date().getTime();
  const newDevice = {name:values.name}
  const actionIds = yield select(({devices}) => devices.forms)
  if(actionIds.length > 0){
    newDevice.actions = actionIds.map(id => values[`actions[${id}]`])
  }
  yield put({type: "CREATE_DEVICE_REQUEST__SUCCESS", payload: {devices: {[id]: {...newDevice,id}}}})
  yield put(push("/devices"))
  yield put(addToast("success", "Device successfully created."))
}
export function* updateDeviceSaga({payload}){
  const newDevice = {name:payload.values.name}
  const actionIds = yield select(({devices}) => devices.forms)
  if(actionIds.length > 0){
    newDevice.actions = actionIds.map(id => payload.values[`actions[${id}]`])
  }
  yield put({type: "UPDATE_DEVICE_REQUEST__SUCCESS", payload: {devices: {[payload.id]: newDevice}}})
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
