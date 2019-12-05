import * as types from '../types';

//entities
export const fetchEntity = (url, entityKey, id) => ({type: types.FETCH_ENTITY, url, entityKey, id, meta: {isFetching: true}})
export const addEntities = (entities, entityKey, id) => ({type: types.RECIEVE_ENTITIES, entities, entityKey, id})
export const addStep = (entities, id) => ({type: types.CREATE_STEP_REQUEST__SUCCESS, entities, id})
export const deleteStep = (id, idx) => ({type: types.DELETE_STEP_REQUEST, idx, id})
export const reorderStep = (stepOrder, hasImage, id) => ({type: types.REORDER_STEP_REQUEST, id, stepOrder, hasImage})

//form
export const setStep = step => ({type: types.SET_STEP, payload: step});
export const setImage = (image) => ({type: types.SET_IMAGE, payload: image});
export const removeImage = (id) => ({type: types.REMOVE_IMAGE, payload: id});
export const clearForm = () => ({type: types.CLEAR_FORM});
export const setImages = (images) => ({type: types.SET_IMAGES, payload: images});
export const createStep = (step) => ({type: types.CREATE_STEP_REQUEST, payload: step});

//meta
export const setEntityFetchError = (fetchError, entityKey, id) => ({type: types.SET_ENTITY_META, entityKey, id, meta: {fetchError}})
export const setEntityFormErrors = (formError, fieldErrors, entityKey, id) => ({type: types.SET_ENTITY_META, entityKey, id, meta: {formError, fieldErrors, isProcessing: false}})
export const handleEntityUpdateSubmit = (url, entityKey, id, values, to) => ({type: types.UPDATE_ENTITY_REQUEST, url, entityKey, id, values, to, meta: {isProcessing: true}});
export const handleEntityCreateSubmit = (url, entityKey, values, to) => ({type: types.CREATE_ENTITY_REQUEST, url, entityKey, values, to});
export const setCreateMeta = (entity) => ({type: types.SET_ENTITY_META, id: entity.id, entityKey: "create", meta: {initialValues: entity}})

//user
export const handleLoginSubmit = values => ({type: types.LOGIN_REQUEST, payload: values});
export const login = (user) => ({type: types.LOGIN_REQUEST__SUCCESS, payload: user});
export const logout = () => ({type: types.LOGOUT})
