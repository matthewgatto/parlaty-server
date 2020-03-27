import merge from 'lodash/merge';
import * as types from '@types/step';
import {
  CREATE_PROCEDURE_REQUEST__SUCCESS,
  UPDATE_PROCEDURE_REQUEST__SUCCESS,
  FETCH_PROCEDURE_REQUEST__SUCCESS
} from '@types/procedure';


export default (state = {}, {type,payload}) => {
  switch (type) {
    case types.STEP_SAVE_REQUEST__SUCCESS:
    case CREATE_PROCEDURE_REQUEST__SUCCESS:
    case UPDATE_PROCEDURE_REQUEST__SUCCESS:
    case FETCH_PROCEDURE_REQUEST__SUCCESS:
      return merge({}, state, payload.steps)
    case types.DELETE_STEP_REQUEST__SUCCESS:
      const {[payload.id]:removedStep,...remainingSteps} = state;
      return remainingSteps
    default:
      return state
  }
}
