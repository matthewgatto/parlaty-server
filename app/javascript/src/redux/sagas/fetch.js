import { call, put } from 'redux-saga/effects';
import API from '@utils/API';

export function* getSaga(action, normalize){
  try {
    const response = yield call(API.get, action.payload.url)
    yield put({
      type: `${action.type}__SUCCESS`,
      payload: yield call(normalize, response, action)
    })
  } catch (e) {
    console.log("e", e);
  }
}
