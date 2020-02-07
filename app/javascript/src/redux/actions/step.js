import uuid from 'uuid/v4'
import * as types from '@types/step';

export const loadStepForms = (steps) => ({type: types.LOAD_STEP_FORMS, payload: steps});
export const reorderImage = (from, to, visual) => ({type: types.REORDER_IMAGE, payload: {from, to, visual}});
export const removeImage = (id) => ({type: types.REMOVE_IMAGE, payload: id});
export const updateImage = (id, visual) => ({type: types.UPDATE_IMAGE, payload: {id, visual}});
export const addImage = (visual, reIndex) => ({type: types.ADD_IMAGE, payload: {visual, reIndex}});
export const reIndexImages = (idx) => ({type: types.REINDEX_IMAGES, payload: idx});
export const addStepForm = (initialValues, isDuplicate) => ({type: types.ADD_STEP_FORM, payload: {id: uuid(), initialValues, isDuplicate}})
export const removeStepForm = (idx) => ({type: types.REMOVE_STEP_FORM, payload: idx})
export const reorderStep = (from, to, visual) => ({type: types.REORDER_STEP_REQUEST, payload: {from, to, visual}})
export const setStepForm = (step) => ({type: types.SET_CURRENT_STEP_FORM, payload: step})
export const removeImageAndReIndex = (from, to) => ({type: types.REMOVE_IMAGE_AND_REINDEX, payload: {from, to}})
export const deleteStep = (id, idx, procedure_id) => ({type: types.DELETE_STEP_REQUEST, payload: {idx, id, procedure_id}})
