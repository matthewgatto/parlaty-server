import uuid from 'uuid/v4'
import * as types from '@types/step';

export const loadStepForms = (steps) => ({type: types.LOAD_STEP_FORMS, payload: steps.map(id => ({id, formId: uuid()}))});
export const addStepForm = (formValues, isDuplicate) => ({type: types.ADD_STEP_FORM, payload: {formId: uuid(), isOpen: true, formValues, isDuplicate}});
export const removeStepForm = (idx) => ({type: types.REMOVE_STEP_FORM, payload: idx});
export const reorderStep = (from, to, procedure_id, onlyReorderStepForm) => ({type: types.REORDER_STEP_REQUEST, payload: {from, to, procedure_id, onlyReorderStepForm}});
export const deleteStep = (id, idx, procedure_id) => ({type: types.DELETE_STEP_REQUEST, payload: {idx, id, procedure_id}});

export const openStepForm = (idx, formValues = {}) => ({type: types.OPEN_STEP_FORM, payload: {idx,formValues}});
export const closeStepForm = (idx) => ({type: types.CLOSE_STEP_FORM, payload: idx});
export const updateFileList = (idx, fileList = {}) => ({type: types.UPDATE_FILE_LIST, payload: {idx, fileList}});