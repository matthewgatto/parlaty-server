import * as types from '../types'

const increaseIdx = (e) => ({...e, idx: e.idx + 1});
const decreaseIdx = (e) => ({...e, idx: e.idx - 1});

const reIndexImages = (images, mapFunction, a, b) => images.map(image => {
  if((!a || image.idx >= a) && (!b || image.idx <= b)){
    return mapFunction(image)
  }
  return image
})

const returnAB = (from, to) => from > to ? ({a: to, b: from}) : ({a: from, b: to})
const splitAndReIndex = (array,from,to) => {
  var {a,b} = returnAB(from, to);
  const images = reIndexImages(array, from > to ? increaseIdx : decreaseIdx, a, b);
  return images;
}

const insertBeforeEnd = (array, a, b, c, d, el) => ([...array.slice(0, a), ...array.slice(b, c).map(decreaseIdx), el, ...array.slice(d)])
const insertAfterBeginning = (array, a, b, c, d, el) => ([...array.slice(0, a), el, ...array.slice(b, c).map(increaseIdx), ...array.slice(d)])
const insertAtEnd = (array, a, el) => ([...array.slice(0,a),...array.slice(a+1).map(decreaseIdx),el]);
const insertImageAndReIndex = (array,from,to,image) => {
  var {a,b} = returnAB(from, to);
  b++
  if(image){
    return insertBeforeEnd(array,a,a,b,b,image)
  } else {
    return reIndexImages(array,decreaseIdx, a, b)
  }
}



const insertImage = (images, idx, image) => ([...images.slice(0, idx), image, ...images.slice(idx).map(increaseIdx)])
const setImage = (images, image) => {
  var idx = images.findIndex(img => img.idx >= image.idx);
  return idx === -1 ? (
    [...images, image]
  ) : (
    [...images.slice(0, idx), image, ...images.slice(idx+1)]
  )
}

const deleteStepVisuals = (images, idx, id) => {
  var imageIdx = images.findIndex(image => image.idx >= idx);
  if(imageIdx === -1){
    return images;
  }
  const updateIdxFrom = images[imageIdx].id === id ? imageIdx + 1 : imageIdx;
  return [...images.slice(0, imageIdx),...images.slice(updateIdxFrom).map(decreaseIdx)]
}

const removeImageAndReorderStep = (images, to, from) => {
  var a = images.findIndex(image => image.idx >= to),
      b = images.findIndex(image => image.idx === from);
  return from > to ? (
    reIndexImages(images,increaseIdx, a, b)
  ) : (
    reIndexImages(images,decreaseIdx, b+1, a)
  )
}

const reorderImage = (images, to, from, image) => {
  var fromIdx = images.findIndex(img => img.idx === from);
  var toIdx = images.findIndex(img => img.idx >= to);
  if(fromIdx === -1){
    fromIdx = images.findIndex(img => img.idx >= from);
    if(fromIdx === -1){
      if(image){
        return [image,...images.map(increaseIdx)]
      }
      return reIndexImages(images, increaseIdx, (toIdx !== 0 && !(images[toIdx] && images[toIdx].idx === toIdx)) ? toIdx + 1 : toIdx)
    } else {
      if(image){
        return insertImageAndReIndex(images, fromIdx, fromIdx === toIdx ? toIdx + 1 : toIdx, image);
      }
      return splitAndReIndex(images, fromIdx, to);
    }
  }
  const updatedImage = {...images[fromIdx], idx: to, ...image};
  if(toIdx === -1){
    return insertAtEnd(images, fromIdx, updatedImage)
  }


  if(fromIdx > toIdx){
    return insertAfterBeginning(images, toIdx, toIdx, fromIdx, fromIdx+1, updatedImage)
  }
  if(images[toIdx].idx === to){
    toIdx++
    return insertBeforeEnd(images, fromIdx, fromIdx+1, toIdx, toIdx, updatedImage)

  } else {
    if(from > to){
      fromIdx++
      return insertAfterBeginning(images, toIdx, toIdx+1, fromIdx, fromIdx, updatedImage)
    } else {
      return insertBeforeEnd(images, fromIdx, fromIdx+1, toIdx, toIdx, updatedImage)
    }
  }

}

const addImage = (images, image, reIndex) => {
  var idx = images.findIndex(img => img.idx >= image.idx);
  return idx === -1 ? (
    [...images, image]
  ) : (
    [...images.slice(0, idx), image, ...(reIndex ? images.slice(idx).map(increaseIdx) : images.slice(idx))]
  )
}

const updateImage = (images, id, image) => images.map(img => img.id === id ? ({...img, ...image}) : img)

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

export const initialState = [];
export default function(state = initialState, { type, payload, meta }){
  switch (type) {
    case types.INSERT_IMAGE:
      return insertImage(state, payload.idx, payload.image)
    case types.SET_IMAGE:
      return setImage(state, payload)
    case types.DELETE_STEP_VISUALS:
      return deleteStepVisuals(state, payload.idx, payload.id)
    case types.REMOVE_IMAGE_AND_REORDER_STEP:
      return removeImageAndReorderStep(state, payload.to, payload.from)
    case types.REORDER_IMAGE:
      return reorderImage(state, payload.to, payload.from, payload.image);
    case types.ADD_IMAGE:
      return addImage(state, payload.image, payload.reIndex);
    case types.UPDATE_IMAGE:
      return updateImage(state, payload.id, payload.image)
    case types.REMOVE_IMAGE:
      return removeImage(state, payload);
    case types.REINDEX_IMAGES:
      return reIndexImages(state, increaseIdx, payload)
    case types.REMOVE_IMAGE_AND_REINDEX:
      return removeImageAndReIndex(state, payload.from, payload.to)
    case types.SET_IMAGES:
      return payload
    case types.LOGOUT:
    case types.CLEAR_FORM:
      return initialState;
    default:
      return state;
  }
}
