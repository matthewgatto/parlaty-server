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

const preFetchEntityHandlerMap = {
  "oems": function*(response, id){
    response.id = id;
    return normalize({id, businesses: response.oem_businesses}, oemSchema).entities
  },
  "businesses": function*(response, id){
    response.oem_business_id = id;
    return normalize(response, businessSchema).entities
  },
  "procedures": function*(response){
    if(response.step){
      yield call(renameParam, response, 'step', 'steps')
    }
    if(response.procedure_id){
      yield call(renameParam, response, 'procedure_id', 'id')
    }
    return normalize(response, procedureSchema).entities
  },
  "landing": function*(response){
    return normalize(response, admingLandingSchema).entities;
  },
}

function* fetchEntitySaga({url, entityKey, id}){
  try {
    const response = yield call(API.get, url)
    const entities = yield call(preFetchEntityHandlerMap[entityKey], response, id);
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

const returnUserValues = values => ({user: values})
function* returnFormattedProcedure({steps, ...procedure}){
  return{
    procedure,
    steps: steps.map(({number, skip, actions, image, audio, mode, ...step}) => step)
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
  "procedures": function*(body){
    return {
      entities: yield call(getNewEntitiesFromProcedure, {...body.procedure, steps: body.steps, id: new Date().getTime()}),
      to: `/business/${body.procedure.oem_business_id}`
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


function* createEntitySaga({url, entityKey, values}){
  try {
    const body = yield call(preCreateEntityHandlerMap[entityKey], values)
    const response = yield call(API.post, url, body);
    const { entities, to } = yield call(postCreateEntityHandlerMap[entityKey], body)
    if(entities) yield put(addEntities(entities))
    if(to) yield put(push(to))
  } catch (e) {
    console.log("ERROR", e);
    yield put(setEntityFormErrors(undefined, {name: "Invalid"}, "create"))
  }
}

const preUpdateEntityHandlerMap = {
  "procedures": returnFormattedProcedure,
  "oems": values => ({oem: values})
}

const postUpdateEntityHandlerMap = {
  "procedures": function*(body, values){
    return {
      entities: yield call(getNewEntitiesFromProcedure, {...body.procedure, steps: body.steps}),
      to: `/business/${values.oem_business_id}`
    }
  },
  "oems": (body, values, id) => ({
    entities: normalize({...values, id}, oemSchema).entities,
    to: `/oem/`+id
  })
}

function* updateEntitySaga({url, entityKey, id, values}){
  try {
    const body = yield call(preUpdateEntityHandlerMap[entityKey], values)

    const response = yield call(API.put, url, body);
    const { entities, to } = yield call(postUpdateEntityHandlerMap[entityKey], body, values, id)

    yield put(addEntities(entities))
    yield put(push(to))
  } catch (e) {
      console.log("ERROR", e);
      yield put(setEntityFormErrors(undefined, {password: "Invalid"}, entityKey, id))
  }
}


export function* loginSaga(){
  while (true) {
    const { payload } = yield take(TYPES.LOGIN_REQUEST);
    console.log("PAYLOAD", payload);
    try {
      const response = yield call(API.post, '/login', {email: payload.email, password: payload.password});
      if(!response.jwt) throw new Error();
      yield put({type: TYPES.LOGIN_REQUEST__SUCCESS, payload: response})
      return response.jwt
    } catch (e) {
      if(e == 401){
        yield put({type: TYPES.LOGIN_REQUEST__FAILURE, payload: "Invalid login credentials" })
      } else {
        yield put({type: TYPES.LOGIN_REQUEST__FAILURE, payload: "An unexpected error has occurred" })
      }
    }
  }
}

function* authSaga(){
  try {
    var token = undefined;// = yield call(getAuthFromStorage) // read and validate auth data from localstorage if found
    while (true) {
      while (!token) {
        token = yield call(loginSaga);
      }

      API.setToken(token);
      localStorage.setItem('token', token);

      yield take(TYPES.LOGOUT);
      //API.removeToken();
      localStorage.removeItem('token');
      token = undefined;
    }
  } catch (e) {
    localStorage.removeItem('auth');
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
