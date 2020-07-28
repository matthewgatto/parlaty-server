import {call, put} from "redux-saga/effects";
import {normalize} from "normalizr";
import API from '@utils/API';
import Schemas from '@utils/models';

export function* languagesSaga(action){
  try {
    const response = yield call(API.get, `/languages`)
    if(response.error){
      yield put({
        type: `${action.type}__FAILURE`,
        payload: {formKey: action.payload.formKey, errors: {formErrors: response.error}}
      })
    }else{
      const payload = normalize(response.languages, [Schemas.language]).entities;
      yield put({
        type: `${action.type}__SUCCESS`,
        payload: payload
      })
    }
  } catch (e) {
    console.log(`GET /languages ERROR`, e);
  }

}