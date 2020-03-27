import * as types from '@types/modal';

export const setModal = (type, data) => ({type: types.SET_MODAL, payload: {type, data}})
