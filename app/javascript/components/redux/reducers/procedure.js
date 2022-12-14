import merge from 'lodash/merge'
import { combineReducers } from 'redux';
import { addIds, immutableRemove, combinedPayload } from '@utils';
import * as comment from '@types/comment';
import * as types from "@types/procedure";
import {
  FETCH_OEM_BUSINESS_PROCEDURES_REQUEST__SUCCESS,
  FETCH_OEM_BUSINESS_PROCEDURES_LIST_REQUEST__SUCCESS
} from '@types/oem_business';
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
    case FETCH_OEM_BUSINESS_PROCEDURES_LIST_REQUEST__SUCCESS:
    case FETCH_OEM_BUSINESS_PROCEDURES_REQUEST__SUCCESS:
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
      return immutableRemove(payload.procedure_id,state)
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
    case types.UPDATE_PROCEDURE_OEM_BUSINESSES_REQUEST__SUCCESS:
    case STEP_SAVE_REQUEST__SUCCESS:
    case REORDER_STEP_REQUEST__SUCCESS:
    case CREATE_PROCEDURE_DEVICE_REQUEST__SUCCESS:
      if(payload.procedures){
        return {
          ...state,
          ...payload.procedures
        }
      }
      return state;
    case FETCH_OEM_BUSINESS_PROCEDURES_LIST_REQUEST__SUCCESS:
    case FETCH_OEM_BUSINESS_PROCEDURES_REQUEST__SUCCESS:
      if(payload.procedures){
        return {
          ...state,
          ...combinedPayload(payload.procedures, state)
        };
      }else{
        return state;
      }
    case DELETE_STEP_REQUEST__SUCCESS:
      const stepOrder = [...state[payload.procedure_id].steps.slice(0,payload.idx), ...state[payload.procedure_id].steps.slice(payload.idx+1)]
      return {
        ...state,
        [payload.procedure_id]: {
          ...state[payload.procedure_id],
          steps: stepOrder,
          steps_order: [...state[payload.procedure_id].steps.slice(0,payload.idx), ...state[payload.procedure_id].steps.slice(payload.idx+1)]
        }
      }
    case comment.DELETE_COMMENT__SUCCESS:
    case comment.DELETE_ALL_COMMENTS__SUCCESS:
    case comment.MAKE_READED__SUCCESS:
      return {...state,
        [payload.procedureId]: { ...state[payload.procedureId],
          has_new_comments: payload.has_new_comments_for_procedure } };

    default:
      return state;
  }
}



export default combineReducers({
  byId: proceduresById,
  allIds: allProcedures
})
