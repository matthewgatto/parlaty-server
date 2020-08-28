import * as types from '@types/form';
import {UPDATE_STEP_FILE_LIST, UPDATE_TAB_VALUES} from '@types/step';
import {UPDATE_ACTION_FILE_LIST} from '@types/action';

export const mountForm = (id,initialValues) => ({type: types.MOUNT_FORM, payload: {id, initialValues}})
export const unmountForm = (id) => ({type: types.UNMOUNT_FORM, payload: id})

export const updateFileList = (idx, objName, fileList = {}) => ({
      type: objName === 'step' ? UPDATE_STEP_FILE_LIST : objName === 'action' ? UPDATE_ACTION_FILE_LIST : null,
      payload: {idx, fileList}
    });
export const updateTabValues = (idx, values = {}) => ({type: UPDATE_TAB_VALUES, payload: {idx, values}});