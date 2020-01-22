import * as types from '../../types/device'
import { addIds } from '../../../utils';

const initialDeviceArray = ["1","2","3","4","5",]
export default (state = initialDeviceArray, {type, payload}) => {
  switch (type) {
    case types.FETCH_DEVICES_REQUEST__SUCCESS:
    case types.CREATE_DEVICE_REQUEST__SUCCESS:
      return addIds(state, payload.devices)
    default:
      return state
  }
}
