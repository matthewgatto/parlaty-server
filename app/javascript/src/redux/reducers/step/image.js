import { LOCATION_CHANGE } from 'connected-react-router';
import * as types from '../../types/step';

const increaseIdx = (e) => ({...e, idx: e.idx + 1});
const decreaseIdx = (e) => ({...e, idx: e.idx - 1});
const reIndexImages = (images, mapFunction, a, b) => images.map(image => {
  if((!a || image.idx >= a) && (!b || image.idx <= b)){
    return mapFunction(image)
  }
  return image
})

const addImage = (images, image, reIndex) => {
  var idx = images.findIndex(img => img.idx >= image.idx);
  return idx === -1 ? (
    [...images, image]
  ) : (
    [...images.slice(0, idx), image, ...(reIndex ? images.slice(idx).map(increaseIdx) : images.slice(idx))]
  )
}

const removeImage = (images, id) => {
  const idx = images.findIndex(image => image.id === id);
  return idx === -1 ? (
    images
  ) : (
    [...images.slice(0, idx), ...images.slice(idx + 1)]
  )
}

const removeImageAndReIndex = (images, from, to) => {
  if(from > to){
    var fromIdx = images.findIndex(img => img.idx >= from);
    return [...images.slice(0,to),...images.slice(to, fromIdx).map(increaseIdx), ...images.slice(fromIdx+1)]
  } else {
    if(to >= images[images.length - 1].idx){
      return [...images.slice(0,from),...images.slice(from+1).map(decreaseIdx)]
    } else{
      if(images[to] && images[to].idx === to){
        return [...images.slice(0,from),...images.slice(from+1, to+1).map(decreaseIdx), ...images.slice(to+1)]
      } else {
        return [...images.slice(0,from),...images.slice(from+1, to).map(decreaseIdx), ...images.slice(to)]
      }

    }
  }
}


const handleFromGreaterThanTo = (arr, f, t, x) => t !== 0 ? (
  [...arr.slice(0, t), x, ...arr.slice(t, f).map(increaseIdx), ...arr.slice(f+1)]
) : (
  [x, ...arr.slice(0, f).map(increaseIdx), ...arr.slice(f+1)]
)
const handleToGreaterThanFrom = (arr,f,t,x) => t >= arr.length || t === -1 ? (
  [...arr.slice(0, f), ...arr.slice(f+1).map(decreaseIdx), x]
) : (
  [...arr.slice(0, f), ...arr.slice(f+1, t).map(decreaseIdx), x, ...arr.slice(t)]
)
const makeNewImage = (fromImage, to, image) => image ? ({...fromImage, ...image, idx: to}) : ({...fromImage, idx: to})

const handleWithFromImage = (images, image, from, to, fromIdx, toIdx, hasToImage) => {
  if(!hasToImage){
    toIdx = images.findIndex(img => img.idx >= to);
  }
  const newImage = makeNewImage(images[fromIdx], to, image);
  if(from > to){
    return handleFromGreaterThanTo(images,fromIdx,toIdx,newImage);
  }
  return handleToGreaterThanFrom(images,fromIdx, hasToImage ? toIdx+1 : toIdx,newImage)
}


const reorderImage = (images, to, from, image) => {
  var fromIdx = images.findIndex(img => img.idx === from);
  var toIdx = images.findIndex(img => img.idx === to);
  const hasFromImage = fromIdx !== -1;
  const hasToImage = toIdx !== -1;
  if(hasFromImage){
    return handleWithFromImage(images,image,from,to,fromIdx,toIdx,hasToImage)
  }
  fromIdx = images.findIndex(img => img.idx >= from);

  //neither have image
  toIdx = images.findIndex(img => img.idx >= to);
  if(fromIdx === -1 && toIdx === -1){
    return images
  }
  if(from > to){
    if(fromIdx === -1){
      return image ? (
        [...images.slice(0,toIdx), image, ...images.slice(toIdx).map(increaseIdx)]
      ) : (
        [...images.slice(0,toIdx), ...images.slice(toIdx).map(increaseIdx)]
      )
    }
    return image ? (
      [...images.slice(0,toIdx), image, ...images.slice(toIdx,fromIdx).map(increaseIdx),...images.slice(fromIdx)]
    ) : (
      [...images.slice(0,toIdx), ...images.slice(toIdx,fromIdx).map(increaseIdx),...images.slice(fromIdx)]
    )
  }
  if(toIdx === -1){
    return images;
  }
  return image ? (
    [...images.slice(0,fromIdx),...images.slice(fromIdx,toIdx+1).map(decreaseIdx),image,...images.slice(toIdx+1)]
  ) : (
    [...images.slice(0,fromIdx),...images.slice(fromIdx,toIdx+1).map(decreaseIdx),...images.slice(toIdx+1)]
  )
}

const initialState = []
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.REORDER_IMAGE:
      return reorderImage(state, payload.to, payload.from, payload.image);
    case types.ADD_IMAGE:
      return addImage(state, payload.image, payload.reIndex);
    case types.UPDATE_IMAGE:
      return state.map(img => img.id === payload.id ? ({...img, ...payload.image}) : img)
    case types.REMOVE_IMAGE:
      return removeImage(state, payload);
    case types.REINDEX_IMAGES:
      return reIndexImages(state, increaseIdx, payload)
    case types.REMOVE_IMAGE_AND_REINDEX:
      return removeImageAndReIndex(state, payload.from, payload.to)



    case types.LOAD_STEP_FORMS:
      return payload.images || state;
    case types.REORDER_STEP_REQUEST:
      return reorderImage(state, payload.to, payload.from, payload.image)
    case LOCATION_CHANGE:
      return [];
    case types.REMOVE_STEP_FORM:
      if(state.findIndex(img => img.idx >= payload.idx) !== -1){
        return [...state.slice(0,payload.idx), ...state.slice(state[payload.idx].idx === payload.idx ? payload.idx+1 : payload.idx).map(decreaseIdx)]
      }
    default:
      return state;
  }
}
