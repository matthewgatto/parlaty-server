import uuid from 'uuid/v4';
import {immutableMove} from '../../../utils';
import { LOCATION_CHANGE } from 'connected-react-router';
import * as types from '../../types/action';

export default (state = [], {type, payload}) => {
  switch (type) {
    case types.ADD_ACTION_FORM:
      return state.length > 0 ? [...state, uuid()] : [uuid()]
    case types.REMOVE_ACTION_FORM:
      return [...state.slice(0,payload),...state.slice(payload+1)]
    case types.REORDER_ACTION_FORM:
      return immutableMove(state, payload.from, payload.to)
    case LOCATION_CHANGE:
      return [];
    case types.LOAD_ACTION_FORMS:
      return payload
    default:
      return state
  }
}
