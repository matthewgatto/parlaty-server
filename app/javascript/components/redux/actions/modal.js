import * as types from '@types/modal';

export const setModal = (type, data) => ({type: types.SET_MODAL, payload: {type, data}});
export const changeActiveFile = (data) => ({type: types.CHANGE_ACTIVE_FILE, payload: data});
