import uuid from 'uuid/v4'
import * as types from '@types/step';

export const loadStepForms = (steps) => ({type: types.LOAD_STEP_FORMS, payload: steps});
export const addStepForm = (initialValues, isDuplicate) => ({type: types.ADD_STEP_FORM, payload: {id: uuid(), isOpen: true, initialValues, isDuplicate}})
export const removeStepForm = (idx) => ({type: types.REMOVE_STEP_FORM, payload: idx})
export const reorderStep = (from, to) => ({type: types.REORDER_STEP_REQUEST, payload: {from, to}})
export const deleteStep = (id, idx, procedure_id) => ({type: types.DELETE_STEP_REQUEST, payload: {idx, id, procedure_id}})

export const openStepForm = (idx, id, formValues = {}) => ({type: types.OPEN_STEP_FORM, payload: {idx,id,formValues}})
export const closeStepForm = (idx) => ({type: types.CLOSE_STEP_FORM, payload: idx})
