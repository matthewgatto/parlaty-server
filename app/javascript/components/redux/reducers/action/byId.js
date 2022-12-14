import merge from 'lodash/merge';
import * as authTypes from '@types/auth';
import * as deviceTypes from '@types/device';
import * as procedureTypes from '@types/procedure';
import * as oemBusinessTypes from '@types/oem_business';
import * as stepTypes from '@types/step';


export default (state = {}, {type,payload}) => {
  switch (type) {
    case deviceTypes.FETCH_DEVICES_REQUEST__SUCCESS:
      if(payload.actions){
        return payload.actions
      }
      return {}
    case oemBusinessTypes.FETCH_OEM_BUSINESS_PROCEDURES_REQUEST__SUCCESS:
    case procedureTypes.FETCH_PROCEDURE_REQUEST__SUCCESS:
    case deviceTypes.CREATE_DEVICE_REQUEST__SUCCESS:
    case deviceTypes.UPDATE_DEVICE_REQUEST__SUCCESS:
    case deviceTypes.CREATE_PROCEDURE_DEVICE_REQUEST__SUCCESS:
    case stepTypes.STEP_SAVE_REQUEST__SUCCESS:
      if(payload.actions){
        return {
          ...state,
          ...payload.actions
        };
      }
      return state
    default:
      return state
  }
}
