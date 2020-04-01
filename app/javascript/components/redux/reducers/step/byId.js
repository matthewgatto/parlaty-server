import merge from 'lodash/merge';
import * as types from '@types/step';
import {
  FETCH_PROCEDURE_REQUEST__SUCCESS
} from '@types/procedure';
import {
  UPDATE_DEVICE_REQUEST__SUCCESS,
  DELETE_DEVICE_REQUEST__SUCCESS
} from '@types/device';

export default (state = {}, {type,payload}) => {
  switch (type) {
    case UPDATE_DEVICE_REQUEST__SUCCESS:
    case types.STEP_SAVE_REQUEST__SUCCESS:
    case FETCH_PROCEDURE_REQUEST__SUCCESS:
    case DELETE_DEVICE_REQUEST__SUCCESS:
      if(payload.steps){
        return merge({}, state, payload.steps)
      }
    case types.DELETE_STEP_REQUEST__SUCCESS:
      const {[payload.id]:removedStep,...remainingSteps} = state;
      return remainingSteps
    default:
      return state
  }
}
