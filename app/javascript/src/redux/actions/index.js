import * as types from '../types';

//entities
export const fetchEntity = (url, entityKey, id) => ({type: types.FETCH_ENTITY, url, entityKey, id, meta: {isFetching: true}})
export const addEntities = (entities, entityKey, id) => ({type: types.RECIEVE_ENTITIES, entities, entityKey, id})

//form
export const setStep = step => ({type: types.SET_STEP, payload: step});
export const setImage = (image) => ({type: types.SET_IMAGE, payload: image});
export const removeImage = (id) => ({type: types.REMOVE_IMAGE, payload: id});
export const handleEntityCreateSubmit = (url, entityKey, values) => ({type: types.CREATE_ENTITY_REQUEST, url, entityKey, values});
export const clearForm = () => ({type: types.CLEAR_FORM});

//meta
export const setEntityFetchError = (fetchError, entityKey, id) => ({type: types.SET_ENTITY_META, entityKey, id, meta: {fetchError}})
export const setEntityFormErrors = (formError, fieldErrors, entityKey, id) => ({type: types.SET_ENTITY_META, entityKey, id, meta: {formError, fieldErrors, isProcessing: false}})
export const handleEntityUpdateSubmit = (url, entityKey, id, values) => ({type: types.UPDATE_ENTITY_REQUEST, url, entityKey, id, values, meta: {isProcessing: true}});


//user
export const handleLoginSubmit = values => ({type: types.LOGIN_REQUEST, payload: values});
export const login = (user) => ({type: types.LOGIN_REQUEST__SUCCESS, payload: user});
export const logout = () => ({type: types.LOGOUT})
