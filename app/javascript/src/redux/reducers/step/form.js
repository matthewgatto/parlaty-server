import { LOCATION_CHANGE } from 'connected-react-router';
import {immutableMove} from '@utils';
import * as types from '@types/step';

export default (state = [], {type, payload}) => {
  switch (type) {
    case types.ADD_STEP_FORM:
      return state.length > 0 ? [...state, payload] : [payload]
    case types.REMOVE_STEP_FORM:
      return [...state.slice(0,payload),...state.slice(payload+1)]
    case types.REORDER_STEP_REQUEST:
      return immutableMove(state, payload.from, payload.to)
    case types.OPEN_STEP_FORM:
      return [...state.slice(0,payload.idx),{...payload, isOpen: true},...state.slice(payload.idx+1)];
    case types.CLOSE_STEP_FORM:
      return [...state.slice(0,payload),{id: state[payload].id},...state.slice(payload+1)];
    case types.STEP_SAVE_REQUEST__SUCCESS:
      return [...state.slice(0,payload.idx),{id: payload.id},...state.slice(payload.idx+1)];
    case LOCATION_CHANGE:
      return [];
    case types.LOAD_STEP_FORMS:
      return payload.map(id => ({id}))
    default:
      return state
  }
}
