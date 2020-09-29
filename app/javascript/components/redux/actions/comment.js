import * as types from '@types/comment';
export const makeReaded = (id, stepId) => ({type: types.MAKE_READED, payload: {id, stepId}});
export const deleteComment = (id, stepId) => ({type: types.DELETE_COMMENT, payload: {id, stepId}});
export const deleteAllComments = (params) => ({type: types.DELETE_ALL_COMMENTS, payload: params});