import { call } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import {getSaga} from './fetch';
import {formSaga} from './form';
import Schemas from '@utils/models';

const normalizeBusiness = (response,{payload:{id}}) => normalize({oem_business_id: id, ...response}, Schemas.business).entities

export function* businessProceduresSaga(action){
  yield call(getSaga, action, normalizeBusiness);
}

export function* createBusinessSaga(action){
  yield call(formSaga, "post", action);
}
