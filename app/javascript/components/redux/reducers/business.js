import merge from 'lodash/merge'
import { combineReducers } from 'redux';
import * as businessTypes from '@types/business'
import * as oemTypes from '@types/oem'
import * as procedureTypes from '@types/procedure'
import * as authTypes from '@types/auth'
import { addIds } from '@utils';

const allBusinesses = (state = null, {type,payload}) => {
  switch (type) {
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
      return {
        ...state,
        [payload.business_id]: {
          ...state[payload.business_id],
          procedures: state[payload.business_id].procedures.filter(procedureId => procedureId !== payload.procedure_id)
        }
      }
    case oemTypes.FETCH_OEM_BUSINESSES_REQUEST__SUCCESS:
    case businessTypes.FETCH_BUSINESS_PROCEDURES_REQUEST__SUCCESS:
    case businessTypes.CREATE_BUSINESS_REQUEST__SUCCESS:
    case procedureTypes.CREATE_PROCEDURE_REQUEST__SUCCESS:
    case "UPDATE_PROCEDURE_CATEGORIES_REQUEST__SUCCESS":
    case authTypes.CREATE_AUTH_REQUEST__SUCCESS:
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
