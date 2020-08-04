import { combineReducers } from 'redux';
import * as oemBusinessTypes from '@types/oem_business'
import * as oemTypes from '@types/oem'
import * as procedureTypes from '@types/procedure'
import * as authTypes from '@types/auth'
import { addIds, immutableRemove, combinedPayload } from '@utils';

const allOemBusinesses = (state = null, {type,payload}) => {
  switch (type) {
    case oemBusinessTypes.DELETE_OEM_BUSINESS_REQUEST__SUCCESS:
      return state.filter(oem_business_id => oem_business_id !== payload.oem_business_id)
    case oemTypes.FETCH_OEM_BUSINESSES_REQUEST__SUCCESS:
    case oemBusinessTypes.FETCH_OEM_BUSINESS_PROCEDURES_REQUEST__SUCCESS:
    case oemBusinessTypes.CREATE_OEM_BUSINESS_REQUEST__SUCCESS:
    case authTypes.CREATE_AUTH_REQUEST__SUCCESS:
      if(payload.oem_businesses){
        return addIds(state, payload.oem_businesses)
      }
    default:
      return state
  }
}

const oemBusinessesById = (state = {}, {type,payload}) => {
  switch (type) {
    case procedureTypes.DELETE_PROCEDURE_REQUEST__SUCCESS:
      const updatedOemBusinesses = {};
      for (var i = 0; i < payload.oem_businesses.length; i++) {
        const oem_business_id = payload.oem_businesses[i];
        const oem_business = state[oem_business_id]
        if(oem_business && oem_business.procedures && oem_business.procedures.length > 0){
          updatedOemBusinesses[oem_business_id] = {...oem_business, procedures: oem_business.procedures.filter(procedure => procedure !== payload.procedure_id)}
        }
      }
      return {
        ...state,
        ...updatedOemBusinesses
      }
    case oemBusinessTypes.DELETE_OEM_BUSINESS_REQUEST__SUCCESS:
      return immutableRemove(payload.oem_business_id,state);
    case oemTypes.FETCH_OEM_BUSINESSES_REQUEST__SUCCESS:
      if(payload.oem_businesses){
        return combinedPayload(payload.oem_businesses, state);
      }
      return state;
    case oemBusinessTypes.FETCH_OEM_BUSINESS_PROCEDURES_REQUEST__SUCCESS:
    case oemBusinessTypes.CREATE_OEM_BUSINESS_REQUEST__SUCCESS:
    case procedureTypes.CREATE_PROCEDURE_REQUEST__SUCCESS:
    case procedureTypes.UPDATE_PROCEDURE_OEM_BUSINESSES_REQUEST__SUCCESS:
    case authTypes.CREATE_AUTH_REQUEST__SUCCESS:
      if(payload.oem_businesses){
        return {
          ...state,
          ...payload.oem_businesses
        }
      }
      return state;
    default:
      return state;
  }
}

export default combineReducers({
  byId: oemBusinessesById,
  allIds: allOemBusinesses
})
