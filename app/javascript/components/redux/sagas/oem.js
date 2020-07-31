import { call, put } from 'redux-saga/effects';
import uuid from 'uuid/v4'
import { normalize } from 'normalizr';
import { push } from 'connected-react-router';
import {getSaga} from './fetch';
import {formSaga,pushAndNotify} from './form';
import Schemas from '@utils/models';
import { addToast } from '@actions/toast';
import API from '@utils/API';

const normalizeOemList = (response) => normalize(response, [Schemas.oem]).entities
const normalizeOemBusinesses = (response) => normalize(response, Schemas.oem).entities
const normalizeOem = ({id, oem}) => normalize({...oem, id}, Schemas.oem).entities;
const normalizeOemCreate = (value) => normalize(value, Schemas.oem).entities

export function* createOemSaga(action){
  const response = yield call(API.post, action.payload.url, action.payload.values)
  const newId = response.id;
  const payload = yield call(normalizeOemCreate, {...response, ...action.payload.values});
  yield put({
    type: `${action.type}__SUCCESS`,
    payload:  {...payload, ...response },
  })
  yield call(handleOemCreate, newId);
}
function* handleOemCreate(newId){
  const pushAndNotifyFunc = pushAndNotify(`/clients/${newId}`, "Client was successfully added.");
  yield call(pushAndNotifyFunc);
}

export function* updateOemSaga(action){
  const values = {oem: {}}
  values.oem = action.payload.values;
  action.payload.values = values;
  yield call(formSaga, "put", action, normalizeOem, handleOemUpdate);
}

function* handleOemUpdate(response){
  yield put(push(`/clients/${response.id}`))
  yield put(addToast("success", "Client successfully updated."))
}

export function* oemListSaga(action){
  yield call(getSaga, action, normalizeOemList);
}

export function* oemBusinessesSaga(action){
  yield call(getSaga, action, normalizeOemBusinesses);
}

export function* deleteClientSaga(action){
  try {
    yield call(API.delete, `/oems/${action.payload}`);
    yield put({type: `${action.type}__SUCCESS`, payload: action.payload})
    yield put(push('/'))
    yield put(addToast("success", "Client was successfully deactivated."))
  } catch (e) {
      console.log("deleteProcedureSaga ERROR", e);
  }
}

// export const normalizeOemInvite = (response,{payload:{values:{user:{name}}}}) => normalize([{...response, name}], [Schemas.oem]).entities
// const handleOemInvite = pushAndNotify('/', "An invitation link has been sent to the email provided.")
// export function* inviteOemSaga(action){
//   action.payload.values = {user: {email: action.payload.values.email, name: action.payload.values.name}, roleable: "oem"}
//   yield call(inviteOemSaga, "post", action, normalizeOemInvite, handleOemInvite);
// }
