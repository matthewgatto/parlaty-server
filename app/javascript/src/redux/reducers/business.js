import merge from 'lodash/merge'
import { combineReducers } from 'redux';
import uniq from 'lodash/uniq';
import * as businessTypes from '../types/business'
import * as oemTypes from '../types/oem'
import * as procedureTypes from '../types/procedure'
import * as authTypes from '../types/auth'
import { checkWith } from '../../utils';

const getIds = (obj) => Object.keys(obj)

const addBusiness = (state, businesses) => state ? (
  [...state, ...getIds(businesses)]
) : (
  getIds(businesses)
)

const allBusinesses = (state = null, {type,payload}) => {
  switch (type) {
    case oemTypes.FETCH_OEM_BUSINESSES_REQUEST__SUCCESS:
    case businessTypes.FETCH_BUSINESS_PROCEDURES_REQUEST__SUCCESS:
    case businessTypes.CREATE_BUSINESS_REQUEST__SUCCESS:
      return payload.businesses ? getIds(payload.businesses) : state
    case authTypes.CREATE_AUTH_REQUEST__SUCCESS:
      if(payload.auth.roleable_type === "Oem"){
        return addBusiness(state, payload.businesses)
      }
    default:
      return state
  }
}


const businessesById = (state = {}, {type,payload}) => {
  switch (type) {
    case oemTypes.FETCH_OEM_BUSINESSES_REQUEST__SUCCESS:
    case businessTypes.FETCH_BUSINESS_PROCEDURES_REQUEST__SUCCESS:
    case businessTypes.CREATE_BUSINESS_REQUEST__SUCCESS:
    case procedureTypes.CREATE_PROCEDURE_REQUEST__SUCCESS:
      if(payload.businesses){
        return merge({}, state, payload.businesses)
      }
    default:
      return state
  }
}

export default combineReducers({
  byId: businessesById,
  allIds: allBusinesses
})
