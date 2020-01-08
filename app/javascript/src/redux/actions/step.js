import * as types from '../types/step';

export const loadStepForms = (steps, images) => ({type: types.LOAD_STEP_FORMS, payload: {images: images ? images.sort((a,b) => (a.idx - b.idx)) : undefined, steps}});
export const reorderImage = (from, to, image) => ({type: types.REORDER_IMAGE, payload: {from, to, image}});
export const removeImage = (id) => ({type: types.REMOVE_IMAGE, payload: id});
export const updateImage = (id, image) => ({type: types.UPDATE_IMAGE, payload: {id, image}});
export const addImage = (image, reIndex) => ({type: types.ADD_IMAGE, payload: {image, reIndex}});
export const reIndexImages = (idx) => ({type: types.REINDEX_IMAGES, payload: idx});

export const addStepForm = (procedure, initialValues, isDuplicate) => {
  const id = new Date().getTime();
  return({type: types.ADD_STEP_FORM, payload: {procedure, id, initialValues, isDuplicate}})
}
export const removeStepForm = (procedure, idx) => ({type: types.REMOVE_STEP_FORM, payload: {procedure, idx}})

export const reorderStep = (procedure_id, from, to, image) => ({type: types.REORDER_STEP_REQUEST, payload: {procedure_id, from, to, image}})
export const setStepForm = (procedure, step) => ({type: types.SET_CURRENT_STEP_FORM, payload: {procedure, step}})
export const stepDragReorder = (formKey, from, to) => ({type: types.REORDER_STEP_REQUEST, payload: {formKey, from, to}})
export const removeImageAndReIndex = (formKey,from, to) => ({type: types.REMOVE_IMAGE_AND_REINDEX, payload: {formKey,from, to}})
export const deleteStep = (id, idx, procedure_id) => ({type: types.DELETE_STEP_REQUEST, payload: {idx, id, procedure_id}})
