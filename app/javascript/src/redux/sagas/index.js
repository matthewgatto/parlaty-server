import { take, call, put, takeEvery, fork, cancel, all, select } from 'redux-saga/effects';
import API from '../../utils/API';
import * as TYPES from '../types';
import {
  addEntities,
  setEntityFetchError,
  setEntityFormErrors
} from '../actions';
import { normalize } from 'normalizr'
import { oemSchema, businessSchema, procedureSchema, adminLandingSchema } from '../../utils/models';
import { push } from 'connected-react-router';
import uniq from 'lodash/uniq'


function renameParam(object, originalParam, newParam){
  Object.defineProperty(object, newParam,
    Object.getOwnPropertyDescriptor(object, originalParam));
  delete object[originalParam];
}

const postFetchEntityHandlerMap = {
  "oems": function*(response, id){
    response.id = id;
    return normalize({id, businesses: response.oem_businesses}, oemSchema).entities
  },
  "businesses": function*(response, id){
    response.oem_business_id = id;
    return normalize(response, businessSchema).entities
  },
  "procedures": function*({procedure_id, steps, ...procedure}){
    const stepArray = []
    if(steps && steps.length){
      for (var i = 0; i < steps.length; i++) {
        const { visual, ...step } = steps[i];
        if(visual){
          stepArray.push({...step, image: visual})
        } else {
          stepArray.push(step)
        }
      }

    }
    return normalize({
      ...procedure,
      id: procedure_id,
      steps: stepArray
    }, procedureSchema).entities
  },
  "landing": function*(response){
    const {entities, result} = normalize(response, [oemSchema]);
    return {
      oems: entities.oems,
      landing: {oem_list: result}
    }
  },
}

function* fetchEntitySaga({url, entityKey, id}){
  try {
    const response = yield call(API.get, url)
    const entities = yield call(postFetchEntityHandlerMap[entityKey], response, id);
    yield put(addEntities(entities, entityKey, id))
  } catch (e) {
    console.log("ERROR", e);
    yield put(setEntityFetchError("An unexpected error has occurred.", entityKey, id))
  }

}

const getEntityMap = ({entities}) => entities

function* getNewEntitiesFromProcedure(body){
  const entityMap = yield select(getEntityMap);
  const business = entityMap.businesses[body.oem_business_id]
  const data = normalize(body, procedureSchema)
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
              }
          }
    }

    appendFormData(obj);

    return formData;
}
const returnUserValues = values => ({user: values})
function returnFormattedProcedure({steps, ...procedure}){
  return {
    procedure,
    steps: steps.map(({id, number, skip, actions, image, audio, visuals, visual, ...step}) => {
      if(image){
        step.visuals =  [image];
        step.has_visual = true;
      } else if(visual){
        step.visual = visual;
      } else if(visuals && visuals.length > 0) {
        step.visuals = visuals
      } else {
        step.visuals = []
      }
      return step;
    })
  }
}
const preCreateEntityHandlerMap = {
  "procedures": returnFormattedProcedure,
  "invite": values => ({user: {name: values.name, email: values.email}, roleable: values.roleable}),
  "forgot_password": returnUserValues,
  "invite_confirmation": returnUserValues
}

const goHome = () => ({to: '/'})

const postCreateEntityHandlerMap = {
  "procedures": function*(procedure, values){
    return {
      entities: yield call(getNewEntitiesFromProcedure, {id: procedure.id, name: values.name, oem_business_id: values.oem_business_id}),
    }
  },
  "invite": function(body){
    if(body.roleable === "oem"){
      var oemId = new Date().getTime();
      return {
        entities: normalize({...body.user, id: oemId}, oemSchema).entities,
        to: `/oem/${oemId}`
      }
    }
    return goHome()
  },
  "forgot_password": goHome,
  "invite_confirmation": goHome
}


function* createEntitySaga({url, entityKey, values, to}){
  try {
    const body = yield call(preCreateEntityHandlerMap[entityKey], values);
    const formData = yield call(objectToFormData, body);
    //const response = {errors: {formError: "Invalid", fieldErrors: {name: "Invalid"}}}
    const response = yield call(API.multipost, url, formData);
    if(response.errors){
      throw {code: "ServerMessage", ...response.errors}
    }
    const { entities } = yield call(postCreateEntityHandlerMap[entityKey], response, values)
    if(entities) yield put(addEntities(entities))
    if(to) yield put(push(to))
  } catch (e) {
    console.log("ERROR", e);
    if(e.code === "ServerMessage"){
      yield put(setEntityFormErrors(e.formError, e.fieldErrors, "create"))
    } else {
      yield put(setEntityFormErrors("An unexpected error has occured", undefined, "create"))
    }

  }
}

const preUpdateEntityHandlerMap = {
  "procedures": returnFormattedProcedure,
  "oems": values => ({oem: values})
}

const postUpdateEntityHandlerMap = {
  "procedures": function*({steps_order, ...procedure}, values){
    return {
      entities: yield call(getNewEntitiesFromProcedure, {...procedure, steps: values.steps}),
    }
  },
  "oems": (response, values, id) => ({
    entities: normalize({...values, id}, oemSchema).entities,
    to: `/oem/`+id
  })
}

function* updateEntitySaga({url, entityKey, id, values, to}){
  try {
    const body = yield call(preUpdateEntityHandlerMap[entityKey], values)
    const formData = yield call(objectToFormData, body);
    const response = yield call(API.multiput, url, formData);
    if(response.errors){
      throw {code: "ServerMessage", ...response.errors}
    }
    const { entities } = yield call(postUpdateEntityHandlerMap[entityKey], response, values, id)
    yield put(addEntities(entities))
    yield put(push(to))
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
export default function* appSagas(){
  yield all([

    yield takeEvery(TYPES.FETCH_ENTITY, fetchEntitySaga),
    yield takeEvery(TYPES.CREATE_ENTITY_REQUEST, createEntitySaga),
    yield takeEvery(TYPES.UPDATE_ENTITY_REQUEST, updateEntitySaga),
    yield authSaga(),
  ])
}
