import merge from 'lodash/merge';
import * as types from '@types/step';
import * as comment from '@types/comment';
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
        return merge({}, state, payload.steps);
      }
      return state;
    case types.DELETE_STEP_REQUEST__SUCCESS:
      return immutableRemove(payload.id,state);
    case comment.DELETE_COMMENT__SUCCESS:
      return {...state,
        [payload.stepId]: { ...state[payload.stepId],
          comments: state[payload.stepId].comments.filter(deviceId => parseInt(deviceId) !== parseInt(payload.commentId)) } };
    case comment.DELETE_ALL_COMMENTS__SUCCESS:
      return {...state,
        [payload.stepId]: { ...state[payload.stepId],
          comments: [], has_new_comments: false } };
    case comment.MAKE_READED__SUCCESS:
      return {...state,
        [payload.stepId]: { ...state[payload.stepId],
          has_new_comments: payload.has_new_comments } };
    default:
      return state;
  }
}
