import { LOCATION_CHANGE } from 'connected-react-router';
import {immutableMove} from '@utils';
import * as types from '@types/step';

export default (state = [], {type, payload}) => {
  switch (type) {
    case types.ADD_STEP_FORM:
      return state.length > 0 ? [...state, payload.id] : [payload.id]
    case types.REMOVE_STEP_FORM:
      return [...state.slice(0,payload),...state.slice(payload+1)]
    case types.REORDER_STEP_REQUEST:
    case types.REMOVE_IMAGE_AND_REINDEX:
      return immutableMove(state, payload.from, payload.to)
    case LOCATION_CHANGE:
      return [];
    case types.LOAD_STEP_FORMS:
      return payload
    default:
      return state
  }
}
