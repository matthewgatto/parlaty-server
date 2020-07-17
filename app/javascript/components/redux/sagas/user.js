import { call, put, select } from 'redux-saga/effects';
import uuid from 'uuid/v4';
import { normalize } from 'normalizr';
import { push } from 'connected-react-router'
import API from '@utils/API';
import Schemas from '@utils/models';
import {formSaga,pushAndNotify} from './form';
import {getById} from '@selectors/user';

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
      body.user.oem_id = client
    } else if(
      roleable === "author" ||
      roleable === "operator"
    ){
      if(!client){
        throw "client"
      }
      body.user.oem_id = client
      if(!categories){
        throw "categories"
      }
      body.user.oem_business_ids = []
      for (var categoryId in categories) {
        if (categories.hasOwnProperty(categoryId) && categories[categoryId] === true && !isNaN(categoryId)) {
          body.user.oem_business_ids.push(parseInt(categoryId))
        }
      }
    }
    const response = yield call(API.post, '/users', body)
    yield put({type: `${action.type}__SUCCESS`, payload: normalize({...response, ...body.user, roleable_type: body.roleable}, Schemas.user).entities})
    yield call(pushAndNotify('/users', `A user invite has been sent to ${body.user.email}`))
  } catch (e) {
    console.log("inviteUser ERROR", e);
  }


}

export function* updateUserSaga(action){
  try {
    const {name,email,client,...categories} = action.payload.values
    const body = {user:{name,email}}
    if(categories){
      const categoryArray = []
      for (var categoryId in categories) {
        if (categories.hasOwnProperty(categoryId) && categories[categoryId] === true && !isNaN(categoryId)) {
          categoryArray.push(parseInt(categoryId))
        }
      }
      body.user.oem_business_ids = categoryArray
    }
    body.user.oem_id = client
    const response = yield call(API.put, `/users/${action.payload.id}`, body);
    const user = yield select(getById(action.payload.id))
    yield put({type: `${action.type}__SUCCESS`, payload: normalize({...user, ...body.user, ...response}, Schemas.user).entities})
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
