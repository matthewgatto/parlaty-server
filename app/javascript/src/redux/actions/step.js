import uuid from 'uuid/v4'
import * as types from '@types/step';

export const loadStepForms = (steps, visuals) => ({type: types.LOAD_STEP_FORMS, payload: {visuals: visuals ? visuals.sort((a,b) => (a.idx - b.idx)) : undefined, steps}});
export const reorderImage = (from, to, visual) => ({type: types.REORDER_IMAGE, payload: {from, to, visual}});
export const removeImage = (id) => ({type: types.REMOVE_IMAGE, payload: id});
export const updateImage = (id, visual) => ({type: types.UPDATE_IMAGE, payload: {id, visual}});
export const addImage = (visual, reIndex) => ({type: types.ADD_IMAGE, payload: {visual, reIndex}});
export const reIndexImages = (idx) => ({type: types.REINDEX_IMAGES, payload: idx});
export const addStepForm = (procedure, initialValues, isDuplicate) => ({type: types.ADD_STEP_FORM, payload: {procedure, id: uuid(), initialValues, isDuplicate}})
export const removeStepForm = (procedure, idx) => ({type: types.REMOVE_STEP_FORM, payload: {procedure, idx}})
export const reorderStep = (from, to, visual) => ({type: types.REORDER_STEP_REQUEST, payload: {from, to, visual}})
export const setStepForm = (procedure, step) => ({type: types.SET_CURRENT_STEP_FORM, payload: {procedure, step}})
export const removeImageAndReIndex = (formKey,from, to) => ({type: types.REMOVE_IMAGE_AND_REINDEX, payload: {formKey,from, to}})
export const deleteStep = (id, idx, procedure_id) => ({type: types.DELETE_STEP_REQUEST, payload: {idx, id, procedure_id}})
