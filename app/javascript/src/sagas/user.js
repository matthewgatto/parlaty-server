import { takeEvery, put, call, select } from 'redux-saga/effects';
import { setFormErrors } from '../store/form';
import {
  LOGIN_REQUEST,
  LOGIN_REQUEST__SUCCESS,
  LOGIN_REQUEST__FAILURE
} from '../store/user';
import API from '../utils/API';

export function* loginSaga({payload}){
  try {
    if(payload.email && payload.email.length && payload.password && payload.password.length){
      let response = yield call(API.post, '/login', {email: payload.email, password: payload.password});
      if(response.jwt){
        API.setToken(response.jwt);
        localStorage.setItem('user', JSON.stringify(response))
        yield put({type: LOGIN_REQUEST__SUCCESS, payload: response})
      } else {
        yield put({type: LOGIN_REQUEST__FAILURE, payload: "An unexpected error has occurred" })
      }
    } else {
      yield put({type: LOGIN_REQUEST__FAILURE, payload: "Please enter both an email and password" })
    }
  } catch (e) {
    if(e === 401){
      yield put({type: LOGIN_REQUEST__FAILURE, payload: "No user exists with that email and password combination" })
    } else {
      yield put({type: LOGIN_REQUEST__FAILURE, payload: "An unexpected error has occurred" })
    }
  }
}

export default function* userSagas() {
  yield takeEvery(LOGIN_REQUEST, loginSaga);
}
