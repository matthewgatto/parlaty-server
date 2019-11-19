import {
  UPDATE_ENTITY_REQUEST,
  CREATE_ENTITY_REQUEST
} from './entities';
import {
  SET_ENTITY_META
} from './meta';
export const SET_STEP = "SET_STEP";
export const SET_IMAGE = "SET_IMAGE";
export const REMOVE_IMAGE = "REMOVE_IMAGE";
export const SET_FORM_ERRORS = "SET_FORM_ERRORS";
export const CLEAR_FORM = "CLEAR_FORM";

export const setStep = step => ({type: SET_STEP, payload: step});
export const setImage = (image) => ({type: SET_IMAGE, payload: image});
export const removeImage = (id) => ({type: REMOVE_IMAGE, payload: id});
export const handleEntityUpdateSubmit = (url, entityKey, id, values) => ({type: UPDATE_ENTITY_REQUEST, url, entityKey, id, values});
export const handleEntityCreateSubmit = (url, entityKey, values) => ({type: CREATE_ENTITY_REQUEST, url, entityKey, values});
export const setFormErrors = (error, fieldErrors) => ({type: SET_FORM_ERRORS, payload: {error, fieldErrors}});
export const clearForm = () => ({type: CLEAR_FORM});

const initialState = {images: [], meta: {}};
export default function(state = initialState, { type, payload, meta }){
  switch (type) {
    case SET_STEP:
      return {
        ...state,
        step: payload
      }
    case SET_IMAGE:
      if(!state.images.length){
        return {
          ...state,
          images: [payload]
        }
      }
      for (var i = 0; i < state.images.length; i++) {
        if(state.images[i].id === payload.id){
          return {
            ...state,
            images: [...state.images.slice(0, i),payload,...state.images.slice(i + 1)]
          }
        }
        if(state.images[i].number > payload.number){
          return {
            ...state,
            images: [...state.images.slice(0, i), payload, ...state.images.slice(i)]
          }
        }
      }
      return {
        ...state,
        images: [...state.images, payload]
      }
    case REMOVE_IMAGE:
      const idx = state.images.findIndex(x => x.id === payload);
      return {
        ...state,
        images: [...state.images.slice(0, idx),...state.images.slice(idx + 1)]
      }
    case CREATE_ENTITY_REQUEST:
    case UPDATE_ENTITY_REQUEST:
      return {
        ...state,
        meta: {
          isProcessing: true
        }
      }
    case SET_FORM_ERRORS:
      return {
        ...state,
        ...payload,
        isProcessing: false
      }
    case SET_ENTITY_META:
      return {
        ...state,
        meta
      }
    case CLEAR_FORM:
      return initialState;
    default:
      return state;
  }
}
