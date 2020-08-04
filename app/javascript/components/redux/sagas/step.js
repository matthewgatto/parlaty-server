import { call, put, select, fork, take } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga'
import { normalize } from 'normalizr';
import {
  reorderStep,
  closeStepForm
} from '@actions/step';
import {getProcedureById} from '@selectors/procedure';
import {getStepFormData} from '@selectors/step';
import {getDeviceById} from '@selectors/device';
import { setModal } from '@actions/modal';
import { setProgress } from '@reducers/progress';
import * as utils from '@utils';
import { stepSchema } from '@utils/validation';
import Schemas from '@utils/models';
import API from '@utils/API';

export const cleanStepParams = ({id,visual,has_visual,video,...step}) => {
  var has_video, has_file;
  if(visual || video){
    const hasImageFile = visual && typeof visual !== 'string';
    const hasVideoFile = video && typeof video !== 'string'
    step.has_visual = true;
    step.visuals = [];
    if(visual){
      if(hasImageFile){
        has_file = true;
      }
      step.visuals.push(visual)
    }
    if(video){
      if(hasVideoFile){
        has_video = true;
        has_file = true;
      }
      step.visuals.push(video)
    }
  } else {
    step.has_visual = false;
  }
  if(!step.safety){
    step.safety = false
  }
  if(!step.spoken){
    step.spoken = false
  }
  return {step,has_video,has_file};
}

function createUploader(step, url, method) {

  let emit;
  const chan = eventChannel(emitter => {
    emit = emitter;
    return () => {};
  });

  const uploadPromise = () => API[`multi${method}file`](url, {step}, (event) => {
    if (event.loaded.total === 1) {
      emit(END);
    }
    emit(event);
  });

  return [ uploadPromise, chan ];
}

function* watchOnProgress(chan) {
  var isUploading = true;
  while (isUploading) {
    const data = yield take(chan);
    const percent = parseInt( Math.round( ( data.loaded / data.total ) * 100 ));
    yield put(setProgress(percent))
    if(percent === 100){
      isUploading = false
    }
  }
}

function* uploadSource(step, url, method) {
  const [ uploadPromise, chan ] = createUploader(step, url, method);
  yield fork(watchOnProgress, chan);
  return yield call(uploadPromise);
}
const delay = (ms) => new Promise(res => setTimeout(res, ms))
function* makeStepRequest(uncleanStepValues, url, method){
  try {
    const {step,has_video,has_file} = cleanStepParams(uncleanStepValues);
    if(has_video){
      yield put(setModal("video_progress"))
      try {
        return yield call(uploadSource, step, url, method)
      } catch (e) {
        throw e
      } finally {
        yield delay(200)
        yield put(setModal())
      }
    } else {
      return yield call(API[has_file ? `multi${method}` : method], url, {step});
    }
  } catch (e) {
    throw e
  }
}
function* createStepSaga({procedure, step:{actions,...step}, initialValues}){
  try {
    const response = yield call(makeStepRequest, {...step, procedure_id: procedure.id }, "/steps", "post");
    return {...normalize({...procedure,steps: procedure.steps ? [...procedure.steps, response] : [response]}, Schemas.procedure).entities,id: response.id}
  } catch (e) {
    throw e
  }
}

function* updateStepSaga({procedure, step, idx, initialValues}){
  try {
    step.id = procedure.steps[idx];
    const response = yield call(makeStepRequest, step, `/steps/${step.id}`, "put");
    return {...normalize(response, Schemas.step).entities, id: response.id}
  } catch (e) {
    throw e
  }
}


export function* deleteStepSaga({type, payload}){
  try {
    yield call(API.delete, `/steps/${payload.id}`)
    yield put({type: `${type}__SUCCESS`, payload})
  } catch (e) {

  }
}

const validateStep = async (step, root) => {
  try {
    await stepSchema.validate(step, {abortEarly: false, stripUnknown: true});
  } catch (e) {
    const fieldErrors = {};
    for (var i = 0; i < e.inner.length; i++) {
      fieldErrors[`${root}${e.inner[i].path}`] = e.inner[i].message
    }
    throw {type: "VALIDATION_FAILURE", fieldErrors}
  }
}

function* addStepActionValues(step, values, root){
  const device = yield select(getDeviceById(step.device_id));
  if(device.actions){
    const actionsRoot = `${root}actions`
    step.actions = device.actions.map(id => {
      const actionRoot = `${actionsRoot}[${id}].`;
      const {name,parameter_name,...actionCopyValues} = utils.makeAction(values, actionRoot);
      return({id, ...actionCopyValues})
    }).filter(action => Object.keys(action).length > 1)
  }
}

export function* stepSaveSaga({type,payload:{values,root,procedure_id,id,idx,formKey}}){
  try {
    const stepMeta = yield select(getStepFormData(id, idx));
    var step = utils.makeStep(values, root);
    if(step.device_id){
      yield call(addStepActionValues, step, values, root)
    }
    yield call(validateStep, step, root)
    let successPayload = {};
    if(procedure_id){
      const procedure = yield select(getProcedureById(procedure_id));
      if(stepMeta.isDuplicate){
        successPayload = yield call(createStepSaga, {procedure, step, initialValues: stepMeta.initialValues})
      } else {
        successPayload = yield call(updateStepSaga, {procedure, step, idx, initialValues: stepMeta.initialValues})
      }
    }
    yield put({type: "STEP_SAVE_REQUEST__SUCCESS", payload: {formKey, idx, ...successPayload}});
  } catch (e) {
    console.log("stepSaveSaga ERROR", e);
    if(e.type === "VALIDATION_FAILURE"){
      yield put({type: `${type}__FAILURE`, payload: {formKey, errors:{fieldErrors: e.fieldErrors}}})
    } else {
      var formError = "An unexpected error has occurred"
      if(e.formError) formError = e.formError;
      else if(e === 401) formError = "Unauthorized";
      yield put({type: `${type}__FAILURE`, payload: {formKey, errors:{formError}}})
    }
  }
}

export function* reorderStepSaga({payload:{procedure_id, from, to}}){
  try {
    if(procedure_id){
      const procedure = yield select(getProcedureById(procedure_id));
      const stepOrder = utils.immutableMove(procedure.steps,from,to);
      var steps_order = stepOrder[0]+"";
      for (var i = 1; i < stepOrder.length; i++) {
        steps_order += `,${stepOrder[i]}`
      }
      const response = yield call(API.multiput, `/procedures/${procedure_id}/reorder`, {procedure: {steps_order}});
      yield put({type: "REORDER_STEP_REQUEST__SUCCESS", payload: {procedures: {[procedure_id]: {...procedure,steps: stepOrder, steps_order: stepOrder}}}});
    }
  } catch (e) {

  }
}
