import { LOCATION_CHANGE } from 'connected-react-router';
import * as types from '@types/modal'

export default function reducer(state = null, {type, payload}){
  switch (type) {
    case types.SET_MODAL:
      return payload || null
    case types.CHANGE_ACTIVE_FILE:
      return {
        ...state,
        type: payload.type,
        data: {
          isArrParams: {
            idx: payload.idx,
            index: payload.index,
            objName: payload.objName
          },
          src: payload.src || '',
          name: payload.name || '',
          fileType: payload.fileType || '',
        }
      };
    case LOCATION_CHANGE:
    case "CREATE_PROCEDURE_DEVICE_REQUEST__SUCCESS":
      return null;
    default:
      return state
  }
}
