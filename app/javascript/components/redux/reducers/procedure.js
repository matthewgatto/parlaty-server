import merge from 'lodash/merge'
import { combineReducers } from 'redux';
import { addIds } from '@utils';
import * as types from "@types/procedure";
import {
  FETCH_BUSINESS_PROCEDURES_REQUEST__SUCCESS
} from '@types/business';
import {
  STEP_SAVE_REQUEST__SUCCESS,
  REORDER_STEP_REQUEST__SUCCESS,
  DELETE_STEP_REQUEST__SUCCESS
} from '@types/step';
import {
  CREATE_PROCEDURE_DEVICE_REQUEST__SUCCESS,
  DELETE_DEVICE_REQUEST__SUCCESS
} from '@types/device';

const allProcedures = (state = null, {type,payload}) => {
  switch (type) {
    case types.DELETE_PROCEDURE_REQUEST__SUCCESS:
      return state.filter(procedureId => procedureId !== payload.procedure_id)
    case types.CREATE_PROCEDURE_REQUEST__SUCCESS:
    case types.FETCH_PROCEDURE_REQUEST__SUCCESS:
    case FETCH_BUSINESS_PROCEDURES_REQUEST__SUCCESS:
      if(payload.procedures){
        return addIds(state, payload.procedures)
      }
    default:
      return state;
  }
}


const proceduresById = (state = {}, {type,payload}) => {
  switch (type) {
    case types.DELETE_PROCEDURE_REQUEST__SUCCESS:
      const {[payload.procedure_id]:removedProcedure,...remainingProcedures} = state;
      return remainingProcedures
    case DELETE_DEVICE_REQUEST__SUCCESS:
      return {
        ...state,
        [payload.procedure_id]: {
          ...state[payload.procedure_id],
          devices: state[payload.procedure_id].devices.filter(deviceId => deviceId !== payload.device_id)
        }
      }
    case types.CREATE_PROCEDURE_REQUEST__SUCCESS:
    case types.UPDATE_PROCEDURE_REQUEST__SUCCESS:
    case types.FETCH_PROCEDURE_REQUEST__SUCCESS:
    case FETCH_BUSINESS_PROCEDURES_REQUEST__SUCCESS:
    case STEP_SAVE_REQUEST__SUCCESS:
    case REORDER_STEP_REQUEST__SUCCESS:
    case CREATE_PROCEDURE_DEVICE_REQUEST__SUCCESS:
    case "UPDATE_PROCEDURE_CATEGORIES_REQUEST__SUCCESS":
      if(payload.procedures){
        return {
          ...state,
          ...payload.procedures
        }
      }
      return state;
    case DELETE_STEP_REQUEST__SUCCESS:
      return {
        ...state,
        [payload.procedure_id]: {
          ...state[payload.procedure_id],
          steps: [...state[payload.procedure_id].steps.slice(0,payload.idx), ...state[payload.procedure_id].steps.slice(payload.idx+1)]
        }
      }
    default:
      return state;
  }
}



export default combineReducers({
  byId: proceduresById,
  allIds: allProcedures
})
