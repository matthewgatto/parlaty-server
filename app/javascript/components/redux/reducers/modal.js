import { LOCATION_CHANGE } from 'connected-react-router';
import * as types from '@types/modal'

export default function reducer(state = null, {type, payload}){
  switch (type) {
    case types.SET_MODAL:
      return payload || null
    case LOCATION_CHANGE:
    case types.CHANGE_ACTIVE_FILE: {
      debugger;
      return {...state, data: {isArrParams: {idx: payload.idx, index: payload.index}, src: payload.src || ''}}
    }
    case "CREATE_PROCEDURE_DEVICE_REQUEST__SUCCESS":
      return null;
    default:
      return state
  }
}
