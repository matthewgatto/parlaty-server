import { call, put } from 'redux-saga/effects';
import uuid from 'uuid/v4';
import { normalize } from 'normalizr';
import { push } from 'connected-react-router'
import API from '@utils/API';
import Schemas from '@utils/models';
import {formSaga,pushAndNotify} from './form';

const handleUpdateSuccess = pushAndNotify('/users', "User was successfully updated")
const handleDeleteSuccess = pushAndNotify('/users', "User was successfully deleted")

export function* inviteUserSaga(action){
  try {
    const {name,email,roleable,client,...categories} = action.payload.values;
    const body = {
      user: {
        name,
        email
      },
      roleable
    }
    if(roleable === "clientadmin"){
      if(!client){
        throw "client"
      }
      body.client = client
    } else if(
      roleable === "author" ||
      roleable === "operator"
    ){
      if(!client){
        throw "client"
      }
      body.client = client
      if(!categories){
        throw "categories"
      }
      body.categories = []
      for (var categoryId in categories) {
        if (categories.hasOwnProperty(categoryId) && categories[categoryId] === true && !isNaN(categoryId)) {
          body.categories.push(categoryId)
        }
      }
    }

    yield put({type: `${action.type}__SUCCESS`, payload: normalize({id: uuid(), ...body.user, roleable_type: body.roleable, client: body.client, categories: body.categories}, Schemas.user).entities})
    yield call(pushAndNotify('/users', `A user invite has been sent to ${body.user.email}`))
    //action.payload.values = body
    //yield call(formSaga, "post", action, action.payload.values.roleable === "oem" && normalizeOEMInvite, handleUserInvite);
    try {
      const response = yield call(API.post, '/users', body)
      console.log('POST /users',response);
    } catch (e) {
      console.log("POST /users  ERROR", e);
    }
  } catch (e) {
    console.log("inviteUser ERROR", e);
  }


}

export function* updateUserSaga(action){
  const body = {
    user: action.payload.values
  }
  if(action.payload.categories){
    const categories = []
    for (var categoryId in action.payload.categories) {
      if (action.payload.categories.hasOwnProperty(categoryId) && action.payload.categories[categoryId] === true && !isNaN(categoryId)) {
        categories.push(categoryId)
      }
    }
    body.user.categories = categories
  }

  yield put({type: `${action.type}__SUCCESS`, payload: normalize({id: action.payload.id, ...body.user}, Schemas.user).entities})
  yield call(handleUpdateSuccess)
  try {
    const response = yield call(API.put, `/users/${action.payload.id}`, body)
    console.log(`PUT /users/${action.payload.id}`,response);
  } catch (e) {
    console.log(`PUT /users/${action.payload.id}  ERROR`, e);
  }
}

export function* fetchUserSaga(action){
  try {
    const response = yield call(API.get, `/users/${action.payload}`)
    console.log(`GET /users/${action.payload}`,response);
  } catch (e) {
    console.log(`GET /users/${action.payload} ERROR`, e);
  }

}

export function* deleteUserSaga(action){
  yield put({type: `${action.type}__SUCCESS`, payload: action.payload})
  yield call(handleDeleteSuccess)
  try {
    const response = yield call(API.delete, `/users/${action.payload}`)
    console.log(`DELETE /users/${action.payload}`,response);
  } catch (e) {
    console.log(`DELETE /users/${action.payload} ERROR`, e);
  }

}


export function* userListSaga(action){
  yield put({type: `${action.type}__SUCCESS`, payload: {users: {}}})
  try {
    const response = yield call(API.get, "/users");
    console.log("GET /users" ,response);
  } catch (e) {
    console.log("GET /users ERROR", e);
  }
}
