import { LOCATION_CHANGE } from 'connected-react-router';
import * as types from '../../types/step';

const increaseIdx = (e) => ({...e, idx: e.idx + 1});
const decreaseIdx = (e) => ({...e, idx: e.idx - 1});
const reIndexImages = (visuals, mapFunction, a, b) => visuals.map(visual => {
  if((!a || visual.idx >= a) && (!b || visual.idx <= b)){
    return mapFunction(visual)
  }
  return visual
})

const addImage = (visuals, visual, reIndex) => {
  var idx = visuals.findIndex(img => img.idx >= visual.idx);
  return idx === -1 ? (
    [...visuals, visual]
  ) : (
    [...visuals.slice(0, idx), visual, ...(reIndex ? visuals.slice(idx).map(increaseIdx) : visuals.slice(idx))]
  )
}

const removeImage = (visuals, id) => {
  const idx = visuals.findIndex(visual => visual.id === id);
  return idx === -1 ? (
    visuals
  ) : (
    [...visuals.slice(0, idx), ...visuals.slice(idx + 1)]
  )
}

const removeImageAndReIndex = (visuals, from, to) => {
  if(from > to){
    var fromIdx = visuals.findIndex(img => img.idx >= from);
    return [...visuals.slice(0,to),...visuals.slice(to, fromIdx).map(increaseIdx), ...visuals.slice(fromIdx+1)]
  } else {
    if(to >= visuals[visuals.length - 1].idx){
      return [...visuals.slice(0,from),...visuals.slice(from+1).map(decreaseIdx)]
    } else{
      if(visuals[to] && visuals[to].idx === to){
        return [...visuals.slice(0,from),...visuals.slice(from+1, to+1).map(decreaseIdx), ...visuals.slice(to+1)]
      } else {
        return [...visuals.slice(0,from),...visuals.slice(from+1, to).map(decreaseIdx), ...visuals.slice(to)]
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
const makeNewImage = (fromImage, to, visual) => visual ? ({...fromImage, ...visual, idx: to}) : ({...fromImage, idx: to})

const handleWithFromImage = (visuals, visual, from, to, fromIdx, toIdx, hasToImage) => {
  if(!hasToImage){
    toIdx = visuals.findIndex(img => img.idx >= to);
  }
  const newImage = makeNewImage(visuals[fromIdx], to, visual);
  if(from > to){
    return handleFromGreaterThanTo(visuals,fromIdx,toIdx,newImage);
  }
  return handleToGreaterThanFrom(visuals,fromIdx, hasToImage ? toIdx+1 : toIdx,newImage)
}


const reorderImage = (visuals, to, from, visual) => {
  var fromIdx = visuals.findIndex(img => img.idx === from);
  var toIdx = visuals.findIndex(img => img.idx === to);
  const hasFromImage = fromIdx !== -1;
  const hasToImage = toIdx !== -1;
  if(hasFromImage){
    return handleWithFromImage(visuals,visual,from,to,fromIdx,toIdx,hasToImage)
  }
  fromIdx = visuals.findIndex(img => img.idx >= from);

  //neither have visual
  toIdx = visuals.findIndex(img => img.idx >= to);
  if(fromIdx === -1 && toIdx === -1){
    return visuals
  }
  if(from > to){
    if(fromIdx === -1){
      return visual ? (
        [...visuals.slice(0,toIdx), visual, ...visuals.slice(toIdx).map(increaseIdx)]
      ) : (
        [...visuals.slice(0,toIdx), ...visuals.slice(toIdx).map(increaseIdx)]
      )
    }
    return visual ? (
      [...visuals.slice(0,toIdx), visual, ...visuals.slice(toIdx,fromIdx).map(increaseIdx),...visuals.slice(fromIdx)]
    ) : (
      [...visuals.slice(0,toIdx), ...visuals.slice(toIdx,fromIdx).map(increaseIdx),...visuals.slice(fromIdx)]
    )
  }
  if(toIdx === -1){
    return visuals;
  }
  return visual ? (
    [...visuals.slice(0,fromIdx),...visuals.slice(fromIdx,toIdx+1).map(decreaseIdx),visual,...visuals.slice(toIdx+1)]
  ) : (
    [...visuals.slice(0,fromIdx),...visuals.slice(fromIdx,toIdx+1).map(decreaseIdx),...visuals.slice(toIdx+1)]
  )
}

const initialState = []
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.REORDER_IMAGE:
      return reorderImage(state, payload.to, payload.from, payload.visual);
    case types.ADD_IMAGE:
      return addImage(state, payload.visual, payload.reIndex);
    case types.UPDATE_IMAGE:
      return state.map(img => img.id === payload.id ? ({...img, ...payload.visual}) : img)
    case types.REMOVE_IMAGE:
      return removeImage(state, payload);
    case types.REINDEX_IMAGES:
      return reIndexImages(state, increaseIdx, payload)
    case types.REMOVE_IMAGE_AND_REINDEX:
      return removeImageAndReIndex(state, payload.from, payload.to)



    case types.LOAD_STEP_FORMS:
      return payload.visuals || state;
    case types.REORDER_STEP_REQUEST:
      return reorderImage(state, payload.to, payload.from, payload.visual)
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
