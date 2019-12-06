import { take, call, put, takeEvery, fork, all, select } from 'redux-saga/effects';
import API from '../../utils/API';
import * as TYPES from '../types';
import {
  addEntities,
  setEntityFetchError,
  setEntityFormErrors,
  removeImage,
  setImages
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
const returnUserValues = values => ({user: values})
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
const createInviteHandlers = {
  "pre": values => ({user: {email: values.email}, roleable: values.roleable}),
  "post": function(response, values){
    if(values.roleable === "oem"){
      return {
        entities: normalize({email: values.email, id: values.id}, Schemas.oem).entities,
      }
    }
  },
}
const createForgotPasswordHandlers = {
  "pre": returnUserValues,
  "post": goHome,
}
const createInviteConfirmationHandlers = {
  "pre": returnUserValues,
  "post": goHome,
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
    if(response.errors){
      throw {code: "ServerMessage", ...response.errors}
    }
    const { entities } = yield call(handlerMap[entityKey].create.post, response, values)
    if(entities) yield put(addEntities(entities, "creating", id))
    if(to) yield put(push(to))
  } catch (e) {
    console.log("ERROR", e);
    if(e.code === "ServerMessage"){
      yield put(setEntityFormErrors(e.formError, e.fieldErrors, "create"))
    } else if(e === 500) {
      yield put(setEntityFormErrors("An unexpected error has occured", undefined, "creating", values.id))
    } else {
      yield put(setEntityFormErrors("An unexpected error has occured", undefined, "creating", values.id))
    }

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
function* deleteStepSaga({id, idx}){
  try {
    yield put(removeImage(id))
    const steps = yield select(getSteps);
    if(steps[id]){
      yield put({type: TYPES.DELETE_STEP_REQUEST__SUCCESS, payload: {id, idx, procedure_id: steps[id].procedure_id}})
      yield fork(API.delete, `/steps/${id}`)
    }

  } catch (e) {
      console.log("ERROR", e);
  }

}
const getImages = ({form}) => form.images
function* reorderStepSaga({id, hasImage, stepOrder}){
  try {
    if(hasImage){
      const images = yield select(getImages)
      const steps = yield select(getSteps);
      const newImages = [];
      for (var i = 0; i < stepOrder.length; i++) {
        const idx = images.findIndex(a => a.id === stepOrder[i]);
        if(idx >= 0){
          newImages.push({...images[idx], number: i + 1})
        }
      }
      yield put(setImages(newImages))
    }

    if(id){
        var steps_order = stepOrder[0]+"";
        for (var i = 1; i < stepOrder.length; i++) {
          steps_order += `, ${stepOrder[i]}`
        }
        const formData = yield call(objectToFormData, {procedure: {steps_order}});
        const response = yield call(API.multiput, `/procedures/${id}/reorder`, formData);
        yield put(addEntities({procedures: {[id]: {steps: stepOrder}}}, "procedures", id));

    }

  } catch (e) {
      console.log("ERROR", e);
  }

}

export default function* appSagas(){
  yield all([
    yield takeEvery(TYPES.FETCH_ENTITY, fetchEntitySaga),
    yield takeEvery(TYPES.CREATE_ENTITY_REQUEST, createEntitySaga),
    yield takeEvery(TYPES.UPDATE_ENTITY_REQUEST, updateEntitySaga),
    yield takeEvery(TYPES.DELETE_STEP_REQUEST, deleteStepSaga),
    yield takeEvery(TYPES.REORDER_STEP_REQUEST, reorderStepSaga),
    yield authSaga(),
  ])
}
