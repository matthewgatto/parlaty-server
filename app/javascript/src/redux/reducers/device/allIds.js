import * as types from '../../types/device'

const addDevice = (state, devices) => state ? (
  [...state, ...Object.keys(devices)]
) : (
  Object.keys(devices)
)

const initialDeviceArray = ["1","2","3","4","5",]
export default (state = initialDeviceArray, {type, payload}) => {
  if(type === types.FETCH_DEVICES_REQUEST__SUCCESS) return Object.keys(payload.devices)
  if(type === types.CREATE_DEVICE_REQUEST__SUCCESS) return addDevice(state, payload.devices)
  return state
}
