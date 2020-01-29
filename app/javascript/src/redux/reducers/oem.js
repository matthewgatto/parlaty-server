import merge from 'lodash/merge';
import { combineReducers } from 'redux';
import { addIds } from '@utils';
import * as types from '@types/oem'
import * as authTypes from '@types/auth'


const allOems = (state = null, {type, payload}) => {
  switch (type) {
      /*
    case authTypes.CREATE_USER_REQUEST__SUCCESS:
      if(!payload.oems){
        break;
      }
      */
    case types.FETCH_OEMS_REQUEST__SUCCESS:
    case types.CREATE_OEM_REQUEST__SUCCESS:
      return addIds(state, payload.oems)
    default:
      return state
  }
}

 const oemsById = (state = {}, {type,payload}) => {
  switch (type) {
    //case authTypes.CREATE_USER_REQUEST__SUCCESS:
    case authTypes.CREATE_AUTH_REQUEST__SUCCESS:
      if(!payload.oems || payload.auth.roleable_type !== "Oem"){
        return state
      }
    case types.FETCH_OEMS_REQUEST__SUCCESS:
    case types.FETCH_OEM_BUSINESSES_REQUEST__SUCCESS:
    case types.CREATE_OEM_REQUEST__SUCCESS:
    case types.UPDATE_OEM_REQUEST__SUCCESS:
      return merge({}, state, payload.oems)
    default:
      return state
  }
}

export default combineReducers({
  byId: oemsById,
  allIds: allOems
})
