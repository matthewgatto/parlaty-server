import merge from 'lodash/merge';
import { combineReducers } from 'redux';
import * as types from '../types/oem'

const addOem = (state, oems) => state ? (
  [...state, ...Object.keys(oems)]
) : (
  Object.keys(oems)
)
const allOems = (state = null, {type, payload}) => {
  if(type === types.FETCH_OEMS_REQUEST__SUCCESS) return Object.keys(payload.oems)
  if(type === types.CREATE_OEM_REQUEST__SUCCESS) return addOem(state, payload.oems)
  return state
}

const shouldUpdateOEMMap = (type) => (
  type === types.FETCH_OEMS_REQUEST__SUCCESS
  || type === types.FETCH_OEM_BUSINESSES_REQUEST__SUCCESS
  || type === types.CREATE_OEM_REQUEST__SUCCESS
  || type === types.UPDATE_OEM_REQUEST__SUCCESS
)
const oemsById = (state = {}, {type,payload}) => shouldUpdateOEMMap(type) ? (
  merge({}, state, payload.oems)
) : (
  state
)

export default combineReducers({
  byId: oemsById,
  allIds: allOems
})
