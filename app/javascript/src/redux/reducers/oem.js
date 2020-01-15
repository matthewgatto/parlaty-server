import merge from 'lodash/merge';
import { combineReducers } from 'redux';
import * as types from '../types/oem'
import * as authTypes from '../types/auth'

const getIds = (obj) => Object.keys(obj)

const addOem = (state, oems) => state ? (
  [...state, ...getIds(oems)]
) : (
  getIds(oems)
)

const allOems = (state = null, {type, payload}) => {
  switch (type) {
    case types.FETCH_OEMS_REQUEST__SUCCESS:
      return getIds(payload.oems)
    /*
    case authTypes.CREATE_USER_REQUEST__SUCCESS:
      if(!payload.oems){
        break;
      }
    */
    case types.CREATE_OEM_REQUEST__SUCCESS:
      return addOem(state, payload.oems)
    default:
      return state
  }
}

 const oemsById = (state = {}, {type,payload}) => {
  switch (type) {
    /*
    case authTypes.CREATE_USER_REQUEST__SUCCESS:
      if(!payload.oems){
        break;
      }
    */
    case types.FETCH_OEMS_REQUEST__SUCCESS:
    case types.FETCH_OEM_BUSINESSES_REQUEST__SUCCESS:
    case types.CREATE_OEM_REQUEST__SUCCESS:
    case types.UPDATE_OEM_REQUEST__SUCCESS:
      return merge({}, state, payload.oems)
      break;
    case authTypes.CREATE_AUTH_REQUEST__SUCCESS:
      if(payload.oems === "Oem"){
        return merge({}, state, payload.oems)
      }
    default:
      return state
  }
}

export default combineReducers({
  byId: oemsById,
  allIds: allOems
})
