import * as comment from '@types/comment';
import { addIds, immutableRemove, immutableArrayRemove } from '@utils';
import { FETCH_PROCEDURE_REQUEST__SUCCESS } from '@types/procedure';
import merge from "lodash/merge";
import {combineReducers} from "redux";

  const allComments = (state = null, {type, payload}) => {
    switch (type) {
    case FETCH_PROCEDURE_REQUEST__SUCCESS:
      if(payload.comments){
        return addIds(state, payload.comments)
      }
      return state;
    case comment.DELETE_COMMENT__SUCCESS:
      return state.filter(comment_id => parseInt(comment_id) !== parseInt(payload.id))
    case comment.DELETE_ALL_COMMENTS__SUCCESS:
      return state.filter((id) => !payload.commentIds.includes(parseInt(id)));
    default:
      return state
  }
}

const commentsById = (state = {}, {type,payload}) => {
  switch (type) {
    case FETCH_PROCEDURE_REQUEST__SUCCESS:
      if(payload.comments){
        return merge({}, state, payload.comments);
      }
      return state;
    case comment.MAKE_READED__SUCCESS:
      if(payload.commentId){
        return { ...state, [payload.commentId]: { ...state[payload.commentId], readed: true } };
      }
      return state;
    case comment.DELETE_COMMENT__SUCCESS:
      return immutableRemove(payload.id, state)
    case comment.DELETE_ALL_COMMENTS__SUCCESS:
      if(payload.commentIds){
        return immutableArrayRemove(payload.commentIds, state)
      }
      return state;
    default:
      return state;
  }
}

export default combineReducers({
  byId: commentsById,
  allIds: allComments
})
