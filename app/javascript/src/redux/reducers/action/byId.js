import merge from 'lodash/merge';
import * as authTypes from '@types/auth';
import * as deviceTypes from '@types/device';
import * as procedureTypes from '@types/procedure';

export default (state = {}, {type,payload}) => {
  switch (type) {
    case deviceTypes.FETCH_DEVICES_REQUEST__SUCCESS:
      if(payload.actions){
        return payload.actions
      }
      return {}
    case procedureTypes.FETCH_PROCEDURE_REQUEST__SUCCESS:
    case deviceTypes.CREATE_DEVICE_REQUEST__SUCCESS:
    case deviceTypes.UPDATE_DEVICE_REQUEST__SUCCESS:
    case "CREATE_PROCEDURE_DEVICE_REQUEST__SUCCESS":
      if(payload.actions){
        return {
          ...state,
          ...payload.actions
        }
      }
    default:
      return state
  }
}
