import merge from 'lodash/merge';
import * as types from '@types/step';
import {
  FETCH_PROCEDURE_REQUEST__SUCCESS
} from '@types/procedure';
import {
  UPDATE_DEVICE_REQUEST__SUCCESS,
  DELETE_DEVICE_REQUEST__SUCCESS
} from '@types/device';
import {immutableRemove} from '@utils';

export default (state = {}, {type,payload}) => {
  switch (type) {
    case UPDATE_DEVICE_REQUEST__SUCCESS:
    case types.STEP_SAVE_REQUEST__SUCCESS:
    case types.UPDATE_LOOPED_STEPS:
    case FETCH_PROCEDURE_REQUEST__SUCCESS:
    case DELETE_DEVICE_REQUEST__SUCCESS:
      if(payload.steps){
        return merge({}, state, payload.steps)
      }
    case types.DELETE_STEP_REQUEST__SUCCESS:
      return immutableRemove(payload.id,state);
    default:
      return state
  }
}
