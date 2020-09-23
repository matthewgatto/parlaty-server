import {UPDATE_STEP_FILE_LIST, SET_STEP_VALUES, RESET_STEPS_VALUES} from '@types/template';
import {UPDATE_ACTION_FILE_LIST} from '@types/action';

export const updateFileList = (idx, objName, fileList = {}) => ({
  type: objName === 'step' ? UPDATE_STEP_FILE_LIST : objName === 'action' ? UPDATE_ACTION_FILE_LIST : null,
  payload: {idx, fileList}
});
export const setStepValues = (idx, values = {}) => ({type: SET_STEP_VALUES, payload: {idx, values}});
export const resetStepsValues = () => ({type: RESET_STEPS_VALUES, payload: {}});