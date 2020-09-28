import * as types from '@types/comments';
export const makeRead = (id) => ({type: types.MAKE_READ, payload: {id}});
export const deleteComment = (id) => ({type: types.DELETE_COMMENT, payload: {id}});
export const deleteAllComments = (step_id) => ({type: types.DELETE_ALL_COMMENTS, payload: {step_id}});