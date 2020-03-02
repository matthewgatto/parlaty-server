import merge from 'lodash/merge'
import { combineReducers } from 'redux';
import { addIds } from '@utils';
import * as types from "@types/device";
import * as authTypes from '@types/auth';
import * as procedureTypes from '@types/procedure';

const allDevices = (state = [], {type,payload}) => {
  switch (type) {
    case types.FETCH_DEVICES_REQUEST__SUCCESS:
      if(payload.devices){
        return Object.keys(payload.devices)
      }
      return []
    case procedureTypes.FETCH_PROCEDURE_REQUEST__SUCCESS:
    case types.CREATE_DEVICE_REQUEST__SUCCESS:
    case types.FETCH_DEVICE_REQUEST__SUCCESS:
    case types.CREATE_PROCEDURE_DEVICE_REQUEST__SUCCESS:
      if(payload.devices){
        return addIds(state, payload.devices)
      }
    default:
      return state;
  }
}


const devicesById = (state = {}, {type,payload}) => {
  switch (type) {
    case types.FETCH_DEVICES_REQUEST__SUCCESS:
      if(payload.devices){
        return payload.devices
      }
      return state;
    case types.CREATE_PROCEDURE_DEVICE_REQUEST__SUCCESS:
      /*
      if(payload.devices){
        const newDevices = {}
        for (var deviceId in payload.devices) {
          if (payload.devices.hasOwnProperty(deviceId)) {
            newDevices[deviceId] = payload.devices[deviceId]
          }
        }
        return {
          ...state,
          ...newDevices
        }
      }
      */
      if(payload.devices){
        return {
          ...state,
          ...payload.devices
        }
      }
      return state;
    case procedureTypes.FETCH_PROCEDURE_REQUEST__SUCCESS:
    case types.CREATE_DEVICE_REQUEST__SUCCESS:
    case types.FETCH_DEVICE_REQUEST__SUCCESS:
    case types.UPDATE_DEVICE_REQUEST__SUCCESS:
      if(payload.devices){
        return merge({}, state, payload.devices)
      }
    default:
      return state;
  }
}



export default combineReducers({
  byId: devicesById,
  allIds: allDevices
})
