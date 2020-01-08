import merge from 'lodash/merge'
import { combineReducers } from 'redux';
import uniq from 'lodash/uniq';
import * as businessTypes from '../types/business'
import * as oemTypes from '../types/oem'
import * as procedureTypes from '../types/procedure'
import { checkWith } from '../../utils';

const shouldUpdateBusinessArray = checkWith((type) => (
  type === oemTypes.FETCH_OEM_BUSINESSES_REQUEST__SUCCESS
  || businessTypes.FETCH_BUSINESS_PROCEDURES_REQUEST__SUCCESS
  || businessTypes.CREATE_BUSINESS_REQUEST__SUCCESS
), "businesses")
const allBusinesses = (state = null, {type,payload}) => shouldUpdateBusinessArray(type, payload) ? (
  state ? uniq([...state,...Object.keys(payload.businesses)]) : Object.keys(payload.businesses)
) : (
  state
)

const shouldUpdateBusinessMap = checkWith((type) => (
  type === oemTypes.FETCH_OEM_BUSINESSES_REQUEST__SUCCESS
  || businessTypes.FETCH_BUSINESS_PROCEDURES_REQUEST__SUCCESS
  || businessTypes.CREATE_BUSINESS_REQUEST__SUCCESS
  || procedureTypes.CREATE_PROCEDURE_REQUEST__SUCCESS
), "businesses")
const businessesById = (state = {}, {type,payload}) => shouldUpdateBusinessMap(type, payload) ? (
  merge({}, state, payload.businesses)
) : (
  state
)

export default combineReducers({
  byId: businessesById,
  allIds: allBusinesses
})
