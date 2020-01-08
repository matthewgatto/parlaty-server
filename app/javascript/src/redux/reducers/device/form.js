import {immutableMove} from '../../../utils';
import { LOCATION_CHANGE } from 'connected-react-router';
import * as types from '../../types/device';
import uuid from 'uuid/v4';

export default (state = [], {type, payload}) => {
  switch (type) {
    case types.ADD_DEVICE_ACTION:
      return state.length > 0 ? [...state, uuid()] : [uuid()]
    case types.REMOVE_DEVICE_ACTION:
      return [...state.slice(0,payload),...state.slice(payload+1)]
    case types.REORDER_DEVICE_ACTION:
      return immutableMove(state, payload.from, payload.to)
    case types.LOAD_DEVICE_ACTIONS:
      return payload
    case LOCATION_CHANGE:
      return [];
    default:
      return state
  }
}
