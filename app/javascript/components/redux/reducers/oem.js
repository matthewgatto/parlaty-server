import { combineReducers } from 'redux';
import { addIds, immutableRemove } from '@utils';
import * as types from '@types/oem'
import * as authTypes from '@types/auth'
import * as businessTypes from '@types/business'

const allOems = (state = null, {type, payload}) => {
  switch (type) {
    case types.DELETE_CLIENT_REQUEST__SUCCESS:
      return state.filter(client_id => client_id !== payload)
    case types.FETCH_OEMS_REQUEST__SUCCESS:
    case types.CREATE_OEM_REQUEST__SUCCESS:
      if(payload.oems){
        return addIds(state, payload.oems)
      }
    default:
      return state
  }
}

const oemsById = (state = {}, {type,payload}) => {
  switch (type) {
    case businessTypes.DELETE_CATEGORY_REQUEST__SUCCESS:
     if(state[payload.oem_id]){
       return {
         ...state,
         [payload.oem_id]: {
           ...state[payload.oem_id],
           businesses: state[payload.oem_id].businesses.filter(category_id => category_id !== payload.category_id)
         }
       }
     }
     return state
   case types.DELETE_CLIENT_REQUEST__SUCCESS:
    return immutableRemove(payload,state)
    case authTypes.CREATE_AUTH_REQUEST__SUCCESS:
    case types.FETCH_OEMS_REQUEST__SUCCESS:
    case types.FETCH_OEM_BUSINESSES_REQUEST__SUCCESS:
    case types.CREATE_OEM_REQUEST__SUCCESS:
    case types.UPDATE_OEM_REQUEST__SUCCESS:
    case businessTypes.CREATE_BUSINESS_REQUEST__SUCCESS:
      if(payload.oems){
        return {
          ...state,
          ...payload.oems
        }
      }
    default:
      return state
  }
}

export default combineReducers({
  byId: oemsById,
  allIds: allOems
})
