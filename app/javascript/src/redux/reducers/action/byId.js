import merge from 'lodash/merge';
import * as authTypes from '@types/auth';
import * as deviceTypes from '@types/device';

export default (state = {}, {type,payload}) => {
  switch (type) {
    case authTypes.CREATE_AUTH_REQUEST__SUCCESS:
    case deviceTypes.CREATE_DEVICE_REQUEST__SUCCESS:
    case deviceTypes.UPDATE_DEVICE_REQUEST__SUCCESS:
      if(payload.actions){
        return merge({}, state, payload.actions)
      }
    default:
      return state
  }
}
