import { take, call, put, takeEvery, fork, all, select } from 'redux-saga/effects';
import API from '../../utils/API';
import * as TYPES from '../types';
import {
  addEntities,
  setEntityFetchError,
  setEntityFormErrors,
  removeImage,
  setImages,
  reorderImages,
  insertImage,
  setStep,
  setImage,
  removeImageAndReorderStep,
  addToast
} from '../actions';
import { normalize } from 'normalizr'
import Schemas from '../../utils/models';
import { push } from 'connected-react-router';
import uniq from 'lodash/uniq'

const getEntityMap = ({entities}) => entities

function* getNewEntitiesFromProcedure(body){
  const entityMap = yield select(getEntityMap);
  const business = entityMap.businesses[body.oem_business_id]
  const data = normalize(body, Schemas.procedure)
  return {
    businesses: {
      [body.oem_business_id]: business ? (
        {procedures: business.procedures ? uniq([...business.procedures, data.result]) : [data.result]}
      ) : (
        {procedures: [data.result]}
      )
    },
    procedures: data.entities.procedures
  }
}
function objectToFormData(obj) {
    var formData = new FormData();

    function appendFormData(data, root) {
          root = root || '';
          if (data instanceof File) {
              formData.append(root, data);
          } else if (Array.isArray(data)) {
            for (var i = 0; i < data.length; i++) {
                appendFormData(data[i], root + '[]');
            }
          } else if (typeof data === 'object' && data) {
              for (var key in data) {
                  if (data.hasOwnProperty(key)) {
                      if (root === '') {
                          appendFormData(data[key], key);
                      } else {
                          appendFormData(data[key], root + '[' + key + ']');
                      }
                  }
              }
          } else {
              if (data !== null && typeof data !== 'undefined') {
                  formData.append(root, data);
              } else if (data === null) {
                  formData.append(root, null);
              }
          }
    }

    appendFormData(obj);

    return formData;
}

function returnFormattedStep({id, shouldCreate, shouldntUpdate, number, skip, actions, image, audio, visuals, visual, ...step}){
  if(image){
    if(typeof image !== "string"){
      step.visuals =  [image];
      step.has_visual = true;
    }
  } else if(visual){
    step.visual = visual;
  } else if(visuals && visuals.length > 0) {
    step.visuals = visuals
  } else {
    step.visuals = [];
    step.has_visual = false;
    step.visual = null;
  }
  return step;
}
const returnUserValues = ({id, password_confirmation,...values}) => ({user: values})
function returnFormattedProcedure({steps, id, ...procedure}){
  return {
    procedure,
    steps: steps.map(returnFormattedStep)
  }
}

const goHome = () => ({to: '/'})

const fetchOemHandlers = {
  "post": function*(response, id){
    response.id = id;
    return normalize({id, businesses: response.oem_businesses}, Schemas.oem).entities
  }
}
const fetchBusinessHandlers = {
  "post": function*(response, id){
    response.oem_business_id = id;
    return normalize(response, Schemas.business).entities
  }
}
const fetchProcedureHandlers = {
  "post": function*({procedure_id, steps, ...procedure}){
    const stepArray = []
    if(steps && steps.length){
      for (var i = 0; i < steps.length; i++) {
        const { visual, ...step } = steps[i];
        if(visual){
          stepArray.push({...step, number: i+1, image: visual})
        } else {
          step.number = i+1;
          stepArray.push(step)
        }
      }

    }
    return normalize({
      ...procedure,
      id: procedure_id,
      steps: stepArray
    }, Schemas.procedure).entities
  }
}
const fetchLandingHandlers = {
  "post": function*(response){
    const {entities, result} = normalize(response, [Schemas.oem]);
    return {
      oems: entities.oems,
      landing: {oem_list: result}
    }
  }
}


const updateStepHandlers = {
  "pre": (values) => ({step: returnFormattedStep(values)}),
  "post": (response, values) => ({
    entities: normalize(values, Schemas.step).entities
  })
}
const updateOemHandlers = {
  "pre": values => ({oem: values}),
  "post": (response, values, id) => ({
    entities: normalize({...values, id}, Schemas.oem).entities,
    to: `/oem/`+id
  }),
}
const updateProcedureHandlers = {
  "pre": (procedure) => ({procedure}),
  "post": function*({steps_order, ...procedure}){
    return {
      entities: normalize(procedure, Schemas.procedure).entities
    }
  },
}

const createStepHandlers = {
  "pre": function({step, previous_step_id}){
    return {
      step: returnFormattedStep(step),
      previous_step_id
    }
  },
  "post": function*({visual, has_visual, image, ...newStep}, values){
    if(visual){
      newStep.image = visual;
    }
    const procedures = yield select(getProcedures);
    const previousProcedure = procedures[values.step.procedure_id];
    previousProcedure.steps = [...previousProcedure.steps, newStep];
    return {
      entities: normalize(previousProcedure, Schemas.procedure).entities
    }
  }
}
const createProcedureHandlers = {
  "pre": returnFormattedProcedure,
  "post": function*(procedure, values){
    return {
      entities: yield call(getNewEntitiesFromProcedure, {id: procedure.id, name: values.name, oem_business_id: values.oem_business_id}),
    }
  }
}
const getOemList = ({entities}) => entities.landing.oem_list
const createInviteHandlers = {
  "pre": values => ({user: {email: values.email, name: values.name}, roleable: values.roleable}),
  "post": function*(response, values){
    if(values.roleable === "oem"){
      const oems = yield select(getOemList);
      var list;
      if(oems){
        list = [...oems, {...response, name: values.name}]
      } else {
        list = [{...response, name: values.name}]
      }
      const {entities, result} = normalize(list, [Schemas.oem]);
      return {
        entities: {
          oems: entities.oems,
          landing: {oem_list: result}
        }
      }
      /*
      return {
        entities: normalize({email: values.email, name: values.name, id: values.id}, Schemas.oem).entities,
      }
      */
    }
  },
}
const createForgotPasswordHandlers = {
  "pre": returnUserValues,
  "post": goHome,
}
const createInviteConfirmationHandlers = {
  "pre": returnUserValues,
  "post": function*(){
    yield put(addToast("success", "Your password has been set, you may now login."))
    return goHome
  }
}


const stepHandlers = {
  "update": updateStepHandlers,
  "create": createStepHandlers
}
const oemHandlers = {
  "update": updateOemHandlers,
  "fetch": fetchOemHandlers
}
const procedureHandlers = {
  "update": updateProcedureHandlers,
  "create": createProcedureHandlers,
  "fetch": fetchProcedureHandlers
}
const inviteHandlers = {
  "create": createInviteHandlers,
}
const forgotPasswordHandlers = {
  "create": createForgotPasswordHandlers,
}
const inviteConfirmationHandlers = {
  "create": createInviteConfirmationHandlers,
}
const businessHandlers = {
  "fetch": fetchBusinessHandlers,
}
const landingHandlers = {
  "fetch": fetchLandingHandlers,
}


const handlerMap = {
  "procedures": procedureHandlers,
  "oems": oemHandlers,
  "invite": inviteHandlers,
  "forgot_password": forgotPasswordHandlers,
  "invite_confirmation": inviteConfirmationHandlers,
  "businesses": businessHandlers,
  "steps": stepHandlers,
  "landing": landingHandlers
}


function* fetchEntitySaga({url, entityKey, id}){
  try {
    const response = yield call(API.get, url)
    const entities = yield call(handlerMap[entityKey].fetch.post, response, id);
    yield put(addEntities(entities, entityKey, id))
  } catch (e) {
    //if 404 not found
    console.log("ERROR", e);
    yield put(setEntityFetchError("An unexpected error has occurred.", entityKey, id))
  }

}



function* createEntitySaga({url, entityKey, values, id, to}){
  try {
    const body = yield call(handlerMap[entityKey].create.pre, values);
    const formData = yield call(objectToFormData, body);
    const response = yield call(API.multipost, url, formData);
    if(response.formError || response.fieldErrors){
      yield put(setEntityFormErrors(response.formError, response.fieldErrors, "creating", id))
    } else {
      const { entities } = yield call(handlerMap[entityKey].create.post, response, values)
      if(entities) yield put(addEntities(entities, "creating", id))
      if(to) yield put(push(to))
    }
  } catch (e) {
    console.log("ERROR", e);
    yield put(setEntityFormErrors("An unexpected error has occured", undefined, "creating", id))
  }
}


function* updateEntitySaga({url, entityKey, id, values, to}){
  try {
    const body = yield call(handlerMap[entityKey].update.pre, values)
    const formData = yield call(objectToFormData, body);
    const response = yield call(API.multiput, url, formData);
    if(response.errors){
      throw {code: "ServerMessage", ...response.errors}
    }
    const { entities } = yield call(handlerMap[entityKey].update.post, response, values, id)
    yield put(addEntities(entities, entityKey, id))
    if(to){
      yield put(push(to))
    }

  } catch (e) {
    console.log("ERROR", e);
    if(e.code === "ServerMessage"){
      yield put(setEntityFormErrors(e.formError, e.fieldErrors, entityKey, id))
    } else {
      yield put(setEntityFormErrors("An unexpected error has occured", undefined, entityKey, id))
    }
  }
}


export function* loginSaga(){
  try {
    const { payload } = yield take(TYPES.LOGIN_REQUEST);
    const response = yield call(API.post, '/login', {email: payload.email, password: payload.password});
    if(!response.jwt) throw new Error();
    localStorage.setItem('user', JSON.stringify(response));
    return response
  } catch (e) {
    if(e == 401){
      yield put({type: TYPES.LOGIN_REQUEST__FAILURE, payload: "Invalid login credentials" })
    } else {
      yield put({type: TYPES.LOGIN_REQUEST__FAILURE, payload: "An unexpected error has occurred" })
    }
    return
  }
}
function* getUserFromStorage(){
  const userFromStorage = localStorage.getItem('user');
  var user;
  if(userFromStorage){
    user = JSON.parse(userFromStorage)
  }
  return user
}
function* authSaga(){
  try {
    var user = yield call(getUserFromStorage) // read and validate auth data from localstorage if found
    while (true) {
      while (!user) {
        user = yield call(loginSaga);
      }
      API.setToken(user.jwt);
      yield put({type: TYPES.LOGIN_REQUEST__SUCCESS, payload: user})
      yield take(TYPES.LOGOUT);
      API.setToken(null);
      localStorage.removeItem('user');
      user = undefined;
    }
  } catch (e) {
    console.log("ERROR", e);
    localStorage.removeItem('user');
  }
}

const getProcedures = ({entities}) => entities.procedures

const getSteps = ({entities}) => entities.steps
function* deleteStepSaga({id, idx, procedure_id}){
  try {
    yield put({type: TYPES.DELETE_STEP_REQUEST__SUCCESS, payload: {id, idx, procedure_id}})
    yield fork(API.delete, `/steps/${id}`)
  } catch (e) {
      console.log("ERROR", e);
  }

}

const getImages = ({form}) => form.images

function* reorderStepSaga({procedure_id, from, to}){
  try {
    yield put(reorderImages(from, to))
    if(procedure_id){
      const procedures = yield select(getProcedures);
      const {steps} = procedures[procedure_id];
      var stepOrder;
      if(from > to){
        stepOrder = [...steps.slice(0, to), steps[from], ...steps.slice(to, from), ...steps.slice(from+1)]
      } else {
        stepOrder = [...steps.slice(0, from), ...steps.slice(from+1, to+1), steps[from], ...steps.slice(to + 1)]
      }
        var steps_order = stepOrder[0]+"";
        for (var i = 1; i < stepOrder.length; i++) {
          steps_order += `, ${stepOrder[i]}`
        }
        const formData = yield call(objectToFormData, {procedure: {steps_order}});
        const response = yield call(API.multiput, `/procedures/${procedure_id}/reorder`, formData);
        yield put(addEntities({procedures: {[procedure_id]: {steps: stepOrder}}}, "procedures", procedure_id));

    }

  } catch (e) {
      console.log("ERROR", e);
  }

}

function returnStepBody({id, shouldCreate, shouldntUpdate, number, actions, image, audio, visuals, visual, has_visual, ...step}){
  if(image){
    step.visuals =  [image];
    step.has_visual = true;
  }
  return step;
}
function* createStepSaga({step, from, to}){
  try {
    const procedures = yield select(getProcedures);
    const procedure = procedures[step.procedure_id];
    const previous_step_id = to > 0 ? procedure.steps[to - 1] : 0;
    const formData = yield call(objectToFormData, {
      step: returnStepBody(step),
      previous_step_id
    });
    const response = yield call(API.multipost, "/steps", formData);
    if(response.errors){
      throw {code: "ServerMessage", ...response.errors}
    }
    const {visual, has_visual, ...newStep} = response;
    if(has_visual){
      newStep.image = visual;
    }
    var steps;
    if(from !== to){
      steps = [...procedure.steps.slice(0, to), newStep, ...procedure.steps.slice(to)]
    } else {
      steps = [...procedure.steps, newStep]
    }
    yield put(addEntities(normalize({id:procedure.id, steps}, Schemas.procedure).entities));
    return newStep;
  } catch (e) {
    console.log("ERROR", e);

  }
}

function* updateStepSaga({step, from, to}){
  try {
    const procedures = yield select(getProcedures);
    const procedure = procedures[step.procedure_id];
    step.id = procedure.steps[from];
    const formData = yield call(objectToFormData, {step: returnFormattedStep(step)});
    const response = yield call(API.multiput, `/steps/${step.id}`, formData);
    if(response.errors){
      throw {code: "ServerMessage", ...response.errors}
    }
    if(from !== to){
      var steps;
      if(from > to){
        steps = [...procedure.steps.slice(0, to), response, ...procedure.steps.slice(to, from), ...procedure.steps.slice(from+1)]
      } else {
        steps = [...procedure.steps.slice(0, from), ...procedure.steps.slice(from+1, to+1), response, ...procedure.steps.slice(to + 1)]
      }
      yield put(addEntities(normalize({id:response.procedure_id, steps}, Schemas.procedure).entities))
    } else {
      yield put(addEntities(normalize(response, Schemas.step).entities))
    }
    const {has_visual, visual, ...newStep} = response;
    if(has_visual){
      newStep.image = visual
    }
    return newStep;
  } catch (e) {
    console.log("ERROR", e);
  }
}

function getUpdatedProperties(newObj = {}, initialObj = {}){
  const updates = {};
  for (var field in newObj) {
    if (newObj.hasOwnProperty(field) && newObj[field] !== initialObj[field]){
      updates[field] = newObj[field]
    }
  }
  return Object.keys(updates).length > 0 ? updates : false;
}

const getStepMeta = ({form}) => form.step;
function readFile(file){
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

function* stepSubmitSaga({payload: {step, idx}}){
  const {isCreating, isEditing, initialValues} = yield select(getStepMeta);
  if(getUpdatedProperties(step, initialValues)){
    const numberMinusOne = step.number - 1,
          newIdx = numberMinusOne != idx ? numberMinusOne : idx;
    if(isCreating){
      step = yield call(createStepSaga, {step, from: idx, to: newIdx})
    } else if(isEditing){
      step = yield call(updateStepSaga, {step, from: idx, to: newIdx})
    }
    const newImage = step.image;
    const initialImage = initialValues ? initialValues.image : false;
    if((initialImage || newImage) && newImage != initialImage){
      if(newImage){
        const image = {id: step.id, idx: newIdx, src: newImage};
        if(typeof image.src != "string"){
          image.src = yield call(readFile, image.src)
        }
        if(idx != newIdx){
          if(isEditing || (initialValues && initialValues.id === step.id)){
            yield put(reorderImages(idx, newIdx, image))
          } else if(isCreating || (!initialValues || initialValues.id !== step.id)) {
            yield put(insertImage(newIdx, image))
          }
        } else {
          yield put(setImage(image))
        }
      } else {
        if(idx != newIdx){
          yield put(removeImageAndReorderStep(idx, newIdx))
        } else {
          yield put(removeImage(step.id))
        }
      }
    } else if(idx != newIdx){
      yield put(reorderImages(idx, newIdx));
    }
  }
  yield put(setStep(null))
}

export default function* appSagas(){
  yield all([
    yield takeEvery(TYPES.FETCH_ENTITY, fetchEntitySaga),
    yield takeEvery(TYPES.CREATE_ENTITY_REQUEST, createEntitySaga),
    yield takeEvery(TYPES.UPDATE_ENTITY_REQUEST, updateEntitySaga),
    yield takeEvery(TYPES.DELETE_STEP_REQUEST, deleteStepSaga),
    yield takeEvery(TYPES.REORDER_STEP_REQUEST, reorderStepSaga),
    //yield takeEvery(TYPES.CREATE_STEP_REQUEST, createStepSaga),
    //yield takeEvery(TYPES.UPDATE_STEP_REQUEST, updateStepSaga),
    yield takeEvery(TYPES.STEP_SUBMIT_CLICK, stepSubmitSaga),
    yield authSaga(),
  ])
}
