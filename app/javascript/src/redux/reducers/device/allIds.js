import * as types from '../../types/device';
import * as authTypes from '../../types/auth';
import { addIds } from '../../../utils';

const initialDeviceArray = ["1","2","3","4","5",]
export default (state = initialDeviceArray, {type, payload}) => {
  switch (type) {
    case authTypes.CREATE_AUTH_REQUEST__SUCCESS:
      if(!payload.devices){
        return state;
      }
    case types.FETCH_DEVICES_REQUEST__SUCCESS:
    case types.CREATE_DEVICE_REQUEST__SUCCESS:
      return addIds(state, payload.devices)
    default:
      return state
  }
}
