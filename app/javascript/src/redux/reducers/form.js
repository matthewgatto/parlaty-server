import * as types from '../types'

const initialState = {images: [], meta: {}};
export default function(state = initialState, { type, payload, meta }){
  switch (type) {
    case types.SET_STEP:
      return {
        ...state,
        step: payload
      }
    case types.SET_IMAGE:
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
    case types.REMOVE_IMAGE:
      const idx = state.images.findIndex(x => x.id === payload);
      return {
        ...state,
        images: [...state.images.slice(0, idx),...state.images.slice(idx + 1)]
      }
    case types.CREATE_ENTITY_REQUEST:
    case types.UPDATE_ENTITY_REQUEST:
      return {
        ...state,
        meta: {
          isProcessing: true
        }
      }
    case types.SET_FORM_ERRORS:
      return {
        ...state,
        ...payload,
        isProcessing: false
      }
    case types.SET_ENTITY_META:
      return {
        ...state,
        meta
      }
    case types.CLEAR_FORM:
      return initialState;
    default:
      return state;
  }
}
