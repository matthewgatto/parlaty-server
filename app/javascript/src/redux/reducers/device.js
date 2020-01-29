import merge from 'lodash/merge'
import { combineReducers } from 'redux';
import { addIds } from '@utils';
import * as types from "@types/device";
import * as authTypes from '@types/auth';

const allDevices = (state = [], {type,payload}) => {
  switch (type) {
    case authTypes.CREATE_AUTH_REQUEST__SUCCESS:
      if(!payload.devices){
        return state;
      }
    case types.CREATE_DEVICE_REQUEST__SUCCESS:
    case types.FETCH_DEVICE_REQUEST__SUCCESS:
    case types.FETCH_DEVICES_REQUEST__SUCCESS:
      if(payload.devices){
        return addIds(state, payload.devices)
      }
    default:
      return state;
  }
}


const devicesById = (state = {}, {type,payload}) => {
  switch (type) {
    case authTypes.CREATE_AUTH_REQUEST__SUCCESS:
      if(!payload.devices){
        return state;
      }
    case types.CREATE_DEVICE_REQUEST__SUCCESS:
    case types.FETCH_DEVICE_REQUEST__SUCCESS:
    case types.UPDATE_DEVICE_REQUEST__SUCCESS:
    case types.FETCH_DEVICES_REQUEST__SUCCESS:
      if(payload.devices){
        return {
          ...state,
          ...payload.devices
        }
      }
    default:
      return state;
  }
}



export default combineReducers({
  byId: devicesById,
  allIds: allDevices
})
