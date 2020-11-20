import API from '@utils/API';
import { setModal } from '@actions/modal';
import { setProgress } from '@reducers/progress';
import {END, eventChannel} from "redux-saga";
import {call, fork, put, take} from "redux-saga/effects";


export function* makeObjRequest(uncleanObjValues, url, method, objName){
  try {
    const {obj,has_video,has_file, has_audio} = objName === "step" ? stepParams(uncleanObjValues) : actionParams(uncleanObjValues);
    if(has_video || has_audio){
      yield put(setModal("video_progress"));
      try {
        return yield call(uploadSource, obj, url, method, objName)
      } catch (e) {
        throw e
      } finally {
        yield delay(200);
        yield put(setModal())
      }
    } else {
      let request = {};
      request[objName] = obj;
      return yield call(API[has_file ? `multi${method}` : method], url, request);
    }
  } catch (e) {
    throw e
  }
}
const actionParams = ({device, ...obj}) => {
  let has_video = false,
    has_file = false;
  if(device && device.actions){
    device.actions.forEach(action => {
      if(action.visuals){
        action.visuals.forEach(file=> {
          const hasVideoFile = file.type && ~file.type.indexOf('video');
          if(file){
            has_file = true;
              if(hasVideoFile){
              has_video = true;
            }
          }
        })
      }
    });
  }
  obj = device;
  return {obj, has_video, has_file};
};

export const stepParams = ({id,visuals,has_visual,...obj}) => {
  let has_video = false, has_file = false, has_audio = false;
  if (visuals) {
    let media = [];
    visuals.forEach(file=> {
      const hasImageFile = file.type && ~file.type.indexOf('image');
      const hasAudioFile = file.type && ~file.type.indexOf('audio');
      const hasVideoFile = file.type && ~file.type.indexOf('video');
      const hasDocFile = file.type && (~file.type.indexOf('application') || ~file.type.indexOf('text'));
      const hasURLMedia = file && typeof file === 'string';
      if(hasURLMedia) obj.has_visual = true;
      obj.visuals = [];
      if (file) {
        if(hasImageFile || hasDocFile){
          has_file = true;
        } else if (hasVideoFile) {
          has_video = true;
          has_file = true;
        } else if (hasAudioFile) {
          has_audio = true;
          has_file = true;
        }
        media.push(file);
      }
    });
    obj.visuals = media;
  } else {
    obj.has_visual = false;
  }
  if(!obj.safety){
    obj.safety = false
  }
  if(!obj.spoken){
    obj.spoken = false
  }
  return {obj, has_video, has_file, has_audio};
};

function createUploader(obj, url, method, objName) {
  let emit;
  const chan = eventChannel(emitter => {
    emit = emitter;
    return () => {};
  });

  let request = {};
  request[objName] = obj;

  const uploadPromise = () => API[`multi${method}file`](url, request, (event) => {
    if (event.loaded.total === 1) {
      emit(END);
    }
    emit(event);
  });

  return [ uploadPromise, chan ];
}

function* watchOnProgress(chan) {
  let isUploading = true;
  while (isUploading) {
    const data = yield take(chan);
    const percent = parseInt( Math.round( ( data.loaded / data.total ) * 100 ));
    yield put(setProgress(percent));
    if(percent === 100){
      isUploading = false
    }
  }
}

function* uploadSource(obj, url, method, objName) {
  const [ uploadPromise, chan ] = createUploader(obj, url, method, objName);
  yield fork(watchOnProgress, chan);
  return yield call(uploadPromise);
}
const delay = (ms) => new Promise(res => setTimeout(res, ms));
