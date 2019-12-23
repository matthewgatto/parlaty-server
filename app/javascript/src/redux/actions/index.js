import * as types from '../types';

//entities
export const fetchEntity = (url, entityKey, id) => ({type: types.FETCH_ENTITY, url, entityKey, id, meta: {isFetching: true}})
export const addEntities = (entities, entityKey, id) => ({type: types.RECIEVE_ENTITIES, entities, entityKey, id})
export const deleteStep = (id, idx, procedure_id) => ({type: types.DELETE_STEP_REQUEST, idx, id, procedure_id})
export const reorderStep = (from, to, procedure_id) => ({type: types.REORDER_STEP_REQUEST, procedure_id, from, to})

//form
export const setStep = step => ({type: types.SET_STEP, payload: step});
export const setImage = (image) => ({type: types.SET_IMAGE, payload: image});
export const removeImage = (id) => ({type: types.REMOVE_IMAGE, payload: id});
export const clearForm = () => ({type: types.CLEAR_FORM});
export const setImages = (images) => ({type: types.SET_IMAGES, payload: images.sort((a,b) => (a.idx - b.idx))});
export const reorderImages = (from, to, image) => ({type: types.REORDER_IMAGES, payload: {from, to, image}})
export const insertImage = (idx, image) => ({type: types.INSERT_IMAGE, payload: {image, idx}})
export const handleStepSubmit = (step, idx) => ({type: types.STEP_SUBMIT_CLICK, payload: {step, idx}})
export const deleteStepVisuals = (id, idx) => ({type: types.DELETE_STEP_VISUALS, payload: {id, idx}})
export const removeImageAndReorderStep = (from, to) => ({type: types.REMOVE_IMAGE_AND_REORDER_STEP, payload: {from, to}})

//meta
export const setEntityFetchError = (fetchError, entityKey, id) => ({type: types.SET_ENTITY_META, entityKey, id, meta: {fetchError}})
export const setEntityFormErrors = (formError, fieldErrors, entityKey, id) => ({type: types.SET_ENTITY_META, entityKey, id, meta: {formError, fieldErrors, isProcessing: false}})
export const handleEntityUpdateSubmit = (url, entityKey, id, values, to) => ({type: types.UPDATE_ENTITY_REQUEST, url, entityKey, id, values, to, meta: {isProcessing: true}});
export const handleEntityCreateSubmit = (url, entityKey, values, id, to) => ({type: types.CREATE_ENTITY_REQUEST, url, entityKey, id, values, to});
export const setCreateMeta = (entity) => ({type: types.SET_ENTITY_META, id: entity.id, entityKey: "creating", meta: {initialValues: entity}})

//user
export const handleLoginSubmit = values => ({type: types.LOGIN_REQUEST, payload: values});
export const logout = () => ({type: types.LOGOUT})

//toast
export const addToast = (status, text) => ({type: types.ADD_TOAST, payload: {id: new Date().getTime(), status, text}})
export const removeToast = id => ({type: types.REMOVE_TOAST, payload: id})
