import * as types from '@types/form';

export const mountForm = (id,initialValues) => ({type: types.MOUNT_FORM, payload: {id, initialValues}})
export const unmountForm = (id) => ({type: types.UNMOUNT_FORM, payload: id})
