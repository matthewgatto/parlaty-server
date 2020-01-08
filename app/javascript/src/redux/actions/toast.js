import * as types from '../types/toast';

export const addToast = (status, text) => ({type: types.ADD_TOAST, payload: {id: new Date().getTime(), status, text}})
export const removeToast = id => ({type: types.REMOVE_TOAST, payload: id})
