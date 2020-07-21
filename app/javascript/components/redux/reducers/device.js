import merge from 'lodash/merge'
import { combineReducers } from 'redux';
import { addIds,immutableRemove } from '@utils';
import * as types from "@types/device";
import * as authTypes from '@types/auth';
import * as procedureTypes from '@types/procedure';
import * as oemBusinessTypes from '@types/oem_business';
import * as stepTypes from '@types/step';

const allDevices = (state = [], {type,payload}) => {
  switch (type) {
    case types.DELETE_DEVICE_REQUEST__SUCCESS:
      return state.filter(deviceId => deviceId !== payload.device_id)
    case types.FETCH_DEVICES_REQUEST__SUCCESS:
      if(payload.devices){
        return Object.keys(payload.devices)
      }
      return []
    case oemBusinessTypes.FETCH_OEM_BUSINESS_PROCEDURES_REQUEST__SUCCESS:
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
    case types.DELETE_DEVICE_REQUEST__SUCCESS:
      return immutableRemove(payload.device_id,state)
    case types.FETCH_DEVICES_REQUEST__SUCCESS:
      if(payload.devices){
        return payload.devices
      }
      return state;
    case types.CREATE_PROCEDURE_DEVICE_REQUEST__SUCCESS:
    case types.UPDATE_DEVICE_REQUEST__SUCCESS:
    case stepTypes.STEP_SAVE_REQUEST__SUCCESS:
      if(payload.devices){
        return {
          ...state,
          ...payload.devices
        }
      }
      return state;
    case oemBusinessTypes.FETCH_OEM_BUSINESS_PROCEDURES_REQUEST__SUCCESS:
    case procedureTypes.FETCH_PROCEDURE_REQUEST__SUCCESS:
    case types.CREATE_DEVICE_REQUEST__SUCCESS:
    case types.FETCH_DEVICE_REQUEST__SUCCESS:
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
