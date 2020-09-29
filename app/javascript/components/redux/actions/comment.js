import * as types from '@types/comment';
export const makeReaded = (params) => ({type: types.MAKE_READED, payload: params});
export const deleteComment = (params) => ({type: types.DELETE_COMMENT, payload: params});
export const deleteAllComments = (params) => ({type: types.DELETE_ALL_COMMENTS, payload: params});