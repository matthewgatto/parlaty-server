import { combineReducers } from 'redux';
import * as businessTypes from '@types/business'
import * as oemTypes from '@types/oem'
import * as procedureTypes from '@types/procedure'
import * as authTypes from '@types/auth'
import { addIds, immutableRemove } from '@utils';

const allBusinesses = (state = null, {type,payload}) => {
  switch (type) {
    case businessTypes.DELETE_CATEGORY_REQUEST__SUCCESS:
      return state.filter(category_id => category_id !== payload.category_id)
    case oemTypes.FETCH_OEM_BUSINESSES_REQUEST__SUCCESS:
    case businessTypes.FETCH_BUSINESS_PROCEDURES_REQUEST__SUCCESS:
    case businessTypes.CREATE_BUSINESS_REQUEST__SUCCESS:
    case authTypes.CREATE_AUTH_REQUEST__SUCCESS:
      if(payload.businesses){
        return addIds(state, payload.businesses)
      }
    default:
      return state
  }
}

const businessesById = (state = {}, {type,payload}) => {
  switch (type) {
    case procedureTypes.DELETE_PROCEDURE_REQUEST__SUCCESS:
      const updatedBusinesses = {};
      for (var i = 0; i < payload.oem_businesses.length; i++) {
        const business_id = payload.oem_businesses[i];
        const business = state[business_id]
        if(business && business.procedures && business.procedures.length > 0){
          updatedBusinesses[business_id] = {...business, procedures: business.procedures.filter(procedure => procedure !== payload.procedure_id)}
        }
      }
      return {
        ...state,
        ...updatedBusinesses
      }
    case businessTypes.DELETE_CATEGORY_REQUEST__SUCCESS:
      return immutableRemove(payload.category_id,state);
    case oemTypes.FETCH_OEM_BUSINESSES_REQUEST__SUCCESS:
    case businessTypes.FETCH_BUSINESS_PROCEDURES_REQUEST__SUCCESS:
    case businessTypes.CREATE_BUSINESS_REQUEST__SUCCESS:
    case procedureTypes.CREATE_PROCEDURE_REQUEST__SUCCESS:
    case procedureTypes.UPDATE_PROCEDURE_CATEGORIES_REQUEST__SUCCESS:
    case authTypes.CREATE_AUTH_REQUEST__SUCCESS:
      if(payload.businesses){
        return {
          ...state,
          ...payload.businesses
        }
      }
    default:
      return state
  }
}

export default combineReducers({
  byId: businessesById,
  allIds: allBusinesses
})
