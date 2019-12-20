import * as types from '../types'

const initialState = {images: [], meta: {}};
export default function(state = initialState, { type, payload, meta }){
  switch (type) {
    case types.SET_STEP:
      return {
        ...state,
        step: payload
      }
    case types.STEP_SUBMIT_CLICK:
      return {
        ...state,
        step: {
          ...state.step,
          isProcessing: true
        }
      }
    case types.INSERT_IMAGE:
      return {
        ...state,
        images: [...state.images.slice(0, payload.idx), payload.image, ...state.images.slice(payload.idx).map(image => ({...image, idx: image.idx+1}))]
      }
    case types.SET_IMAGE:
      var newImageIdx = state.images.findIndex(image => image.idx >= payload.idx);
      return {
        ...state,
        images: newImageIdx === -1 ? (
          [...state.images, payload]
        ) : (
          [...state.images.slice(0, newImageIdx), payload, ...state.images.slice(newImageIdx+1)]
        )
      }
    case types.REMOVE_IMAGE:
      const idx = state.images.findIndex(x => x.id === payload);
      if(idx >= 0){
        return {
          ...state,
          images: [...state.images.slice(0, idx),...state.images.slice(idx + 1)]
        }
      }
      return state;
    case types.DELETE_STEP_VISUALS:

      var imageIdx = state.images.findIndex(image => image.idx >= payload.idx);
      if(imageIdx === -1){
        return state;
      }
      const updateIdxFrom = state.images[imageIdx].id === payload.id ? imageIdx + 1 : imageIdx;
      return {
        ...state,
        images: [...state.images.slice(0, imageIdx),...state.images.slice(updateIdxFrom).map(image => ({...image, idx: image.idx - 1}))]
      }
    case types.REMOVE_IMAGE_AND_REORDER_STEP:
      var a = state.images.findIndex(image => image.idx >= payload.to),
          b = state.images.findIndex(image => image.idx === payload.from),
          imageArray;
      if(payload.from > payload.to){
        imageArray = [...state.images.slice(0, a), ...state.images.slice(a, b).map(image => ({...image, idx: image.idx+1})), ...state.images.slice(b+1)]
      } else {
        imageArray = [...state.images.slice(0, b), ...state.images.slice(b+1, a).map(image => ({...image, idx: image.idx-1})), ...state.images.slice(a)]
      }
      return {
        ...state,
        images: imageArray
      }
    case types.REORDER_IMAGES:
      var to = state.images.findIndex(image => image.idx >= payload.to),
          from = state.images.findIndex(image => image.idx === payload.from),
          images,
          image;

      if(payload.image){
        image = payload.image
      } else if(from >= 0){
        image = {...state.images[from], idx: payload.to}
      }
      if(from === -1 && to === -1){
        from = state.images.findIndex(image => image.idx >= payload.from);
        if(payload.from > payload.to){
          if(image){
            images = [...state.images.slice(0, image.idx), image, ...state.images.slice(image.idx, from).map(image => ({...image, idx: image.idx+1})), ...state.images.slice(from)]
          } else {
            images = [...state.images.slice(0, to), ...state.images.slice(to, from).map(image => ({...image, idx: image.idx+1})), ...state.images.slice(from)]
          }
        } else {
          if(image){
            images = [...state.images.slice(0, from), ...state.images.slice(from, to).map(image => ({...image, idx: image.idx-1})), image]
          } else {
            images = [...state.images.slice(0, from), ...state.images.slice(from, to).map(image => ({...image, idx: image.idx-1})), ...state.images.slice(to)]
          }
        }
      } else if (to === -1){
        images = [...state.images.slice(0, from), ...state.images.slice(from+1).map(image => ({...image, idx: image.idx-1})), image]
      } else if (from === -1){
        from = state.images.findIndex(image => image.idx >= payload.from);
        if(payload.from > payload.to){
          if(image){
            if(from === -1){
              images = [...state.images.slice(0, to), image, ...state.images.slice(to).map(image => ({...image, idx: image.idx+1}))]
            } else {
              images = [...state.images.slice(0, to), image, ...state.images.slice(to, from).map(image => ({...image, idx: image.idx+1})), ...state.images.slice(from)]
            }
          } else {
            if(from === -1){
              images = [...state.images.slice(0, to), ...state.images.slice(to).map(image => ({...image, idx: image.idx+1}))]
            } else {
              images = [...state.images.slice(0, to), ...state.images.slice(to, from).map(image => ({...image, idx: image.idx+1})), ...state.images.slice(from)]
            }
          }
        } else {
          if(image){
            images = [...state.images.slice(0, from), ...state.images.slice(from, to+1).map(image => ({...image, idx: image.idx-1})), image, ...state.images.slice(to + 1)]
          } else {
            images = [...state.images.slice(0, from), ...state.images.slice(from, to+1).map(image => ({...image, idx: image.idx-1})), ...state.images.slice(to + 1)]
          }
        }
      } else {
        if(payload.from > payload.to){
          images = [...state.images.slice(0, to), image, ...state.images.slice(to, from).map(image => ({...image, idx: image.idx+1})), ...state.images.slice(from+1)]
        } else {
          if(state.images[to].idx === image.idx){
            images = [...state.images.slice(0, from), ...state.images.slice(from+1, to+1).map(image => ({...image, idx: image.idx-1})), image, ...state.images.slice(to+1)]
          } else {
            images = [...state.images.slice(0, from), ...state.images.slice(from+1, to).map(image => ({...image, idx: image.idx-1})), image, ...state.images.slice(to)]
          }
        }
      }
      return {
        ...state,
        images
      }
    case types.SET_IMAGES:
      return {
        ...state,
        images: payload
      }
    case types.LOGOUT:
    case types.CLEAR_FORM:
      return initialState;
    default:
      return state;
  }
}
