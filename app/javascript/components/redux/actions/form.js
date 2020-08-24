import * as types from '@types/form';
import {UPDATE_STEP_FILE_LIST} from '@types/step';
import {UPDATE_ACTION_FILE_LIST} from '@types/action';

export const mountForm = (id,initialValues) => ({type: types.MOUNT_FORM, payload: {id, initialValues}})
export const unmountForm = (id) => ({type: types.UNMOUNT_FORM, payload: id})

export const updateFileList = (idx, item, fileList = {}) => ({
      type: item === 'step' ? UPDATE_STEP_FILE_LIST : item === 'action' ? UPDATE_ACTION_FILE_LIST : null,
      payload: {idx, fileList}
    });