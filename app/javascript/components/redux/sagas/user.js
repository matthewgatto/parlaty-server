import { call, put, select } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import API from '@utils/API';
import Schemas from '@utils/models';
import {formSaga,pushAndNotify} from './form';
import {getById} from '@selectors/user';

const handleUpdateSuccess = pushAndNotify('/users', "User was successfully updated")
const handleDeleteSuccess = pushAndNotify('/users', "User was successfully deleted")

export function* inviteUserSaga(action){
  try {
    const {name,email,roleable,client,...oemBusinesses} = action.payload.values;
    const body = {
      user: {
        name,
        email
      },
      roleable
    };
    if(roleable === "clientadmin"){
      if(!client){
        throw "client"
      }
      body.user.oem_id = client
    } else if(
      roleable === "author" ||
      roleable === "operator"
    ){
      if(!client){
        throw "client"
      }
      body.user.oem_id = client
      if(!oemBusinesses){
        throw "oemBusinesses"
      }
      body.user.oem_business_ids = getOemBusinessIds(oemBusinesses)
    }
    const response = yield call(API.post, '/users', body)
    if(response.error){
      yield put(responseErrorHash(action, response))
    }else{
      yield put({type: `${action.type}__SUCCESS`, payload: normalize({...response, ...body.user, roleable_type: body.roleable}, Schemas.user).entities})
      yield call(pushAndNotify('/users', `A user invite has been sent to ${body.user.email}`))
    }
  } catch (e) {
    yield put(responseErrorHash(action, {error: "Can not create current user"}))
    console.log("inviteUser ERROR", e);
  }
}

export function* updateUserSaga(action){
  try {
    const {name,email,client,...oemBusinesses} = action.payload.values
    const body = {user:{name,email}}
    if(oemBusinesses){
      body.user.oem_business_ids = getOemBusinessIds(oemBusinesses)
    }
    body.user.oem_id = client
    const response = yield call(API.put, `/users/${action.payload.id}`, body);
    if(response.error){
      yield put(responseErrorHash(action, response))
    }else{
      const user = yield select(getById(action.payload.id))
      yield put({
        type: `${action.type}__SUCCESS`,
        payload: normalize({...user, ...body.user, ...response}, Schemas.user).entities
      })
      yield call(handleUpdateSuccess)
    }
  } catch (e) {
    yield put(responseErrorHash(action, e))
    console.log(`PUT /users/${action.payload.id}  ERROR`, e);
  }
}

export function* fetchUserSaga(action){
  try {
    const response = yield call(API.get, `/users/${action.payload}`)
    if(response.error){
      yield put(responseErrorHash(action, response))
    }else{
      yield put({
        type: `${action.type}__SUCCESS`,
        payload: normalize(response, Schemas.user).entities
      })
    }
  } catch (e) {
    yield put(responseErrorHash(action, e))
    console.log(`GET /users/${action.payload} ERROR`, e);
  }

}

export function* deleteUserSaga(action){
  try {
    const response = yield call(API.delete, `/users/${action.payload}`)
    if(response.error){
      yield put(responseErrorHash(action, response))
    }else{
      yield put({
        type: `${action.type}__SUCCESS`,
        payload: action.payload})
    }
    yield call(handleDeleteSuccess)
  } catch (e) {
    yield put(responseErrorHash(action, e))
    console.log(`DELETE /users/${action.payload} ERROR`, e);
  }

}

export function* userListSaga(action){
  try {
    const {users} = yield call(API.get, "/users");
    yield put({type: `${action.type}__SUCCESS`, payload: normalize(users, [Schemas.user]).entities})
  } catch (e) {
    console.log("GET /users ERROR", e);
  }
}

function getOemBusinessIds(oemBusinessIds){
  const idsArray = []
  for (let oemBusinessId in oemBusinessIds) {
    if (!isNaN(oemBusinessId) && oemBusinessIds.hasOwnProperty(oemBusinessId) && oemBusinessIds[oemBusinessId] === true) {
      idsArray.push(parseInt(oemBusinessId))
    }
  }
  return idsArray;
}

function responseErrorHash(action, response){
  return {
    type: `${action.type}__FAILURE`,
    payload: {formKey: action.payload.formKey, errors: {fieldErrors: response.error}}
  }
}