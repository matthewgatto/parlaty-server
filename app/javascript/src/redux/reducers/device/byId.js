import merge from 'lodash/merge';
import * as types from '../../types/device'

const initialDeviceMap = {
  "1": {id: "1", name: "Crank handle", actions: ["Crank Action One", "Crank Action Two", "Crank Action Three"]},
  "2": {id: "2", name: "Part with Lock", actions: ["Part Action One", "Part Action Two", "Part Action Three"]},
  "3": {id: "3", name: "Blowtorch", actions: ["Blowtorch Action One", "Blowtorch Action Two", "Blowtorch Action Three"]},
  "4": {id: "4", name: "Pressure Washer", actions: ["Pressure One", "Pressure Two", "Pressure Three"]},
  "5": {id: "5", name: "Wrench", actions: ["Wrench One", "Wrench Two", "Wrench Three"]}
}
const shouldUpdateDeviceMap = (type) => (
  type === types.FETCH_DEVICES_REQUEST__SUCCESS
  || type === types.CREATE_DEVICE_REQUEST__SUCCESS
  || type === types.UPDATE_DEVICE_REQUEST__SUCCESS
)
export default (state = initialDeviceMap, {type,payload}) => shouldUpdateDeviceMap(type) ? (
  merge({}, state, payload.devices)
) : (
  state
)