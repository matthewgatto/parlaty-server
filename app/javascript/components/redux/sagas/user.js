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
    const response = yield call(API.post, '/users', body)
    yield put({type: `${action.type}__SUCCESS`, payload: normalize({id: uuid(), ...body.user, roleable_type: body.roleable, client: body.client, categories: body.categories}, Schemas.user).entities})
    yield call(pushAndNotify('/users', `A user invite has been sent to ${body.user.email}`))
  } catch (e) {
    console.log("inviteUser ERROR", e);
  }


}

export function* updateUserSaga(action){
  try {
    const {name,email,client,...categories} = action.payload.values
    const body = {user:{name,email,client}}
    if(categories){
      const categoryArray = []
      for (var categoryId in categories) {
        if (categories.hasOwnProperty(categoryId) && categories[categoryId] === true && !isNaN(categoryId)) {
          categoryArray.push(categoryId)
        }
      }
      body.user.categories = categoryArray
    }
    const response = yield call(API.put, `/users/${action.payload.id}`, body)
    yield put({type: `${action.type}__SUCCESS`, payload: normalize({...response, ...body.user}, Schemas.user).entities})
    yield call(handleUpdateSuccess)

  } catch (e) {
    console.log(`PUT /users/${action.payload.id}  ERROR`, e);
  }
}

export function* fetchUserSaga(action){
  try {
    const response = yield call(API.get, `/users/${action.payload}`)
    yield put({type: `${action.type}__SUCCESS`, payload: normalize(response, Schemas.user).entities})
  } catch (e) {
    console.log(`GET /users/${action.payload} ERROR`, e);
  }

}

export function* deleteUserSaga(action){
  try {
    const response = yield call(API.delete, `/users/${action.payload}`)
    yield put({type: `${action.type}__SUCCESS`, payload: action.payload})
    yield call(handleDeleteSuccess)
  } catch (e) {
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
