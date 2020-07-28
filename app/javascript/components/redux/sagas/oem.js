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
const normalizeOemBusinesses = ({name,oem_businesses},{payload:{id}}) => normalize({id,name,oem_businesses: oem_businesses}, Schemas.oem).entities
const normalizeOem = (response, {payload:{values:{oem},id}}) => normalize({...oem, id}, Schemas.oem).entities
export const normalizeOemInvite = (response,{payload:{values:{user:{name}}}}) => normalize([{...response, name}], [Schemas.oem]).entities

// const handleOemInvite = pushAndNotify('/', "An invitation link has been sent to the email provided.")
// export function* inviteOemSaga(action){
//   action.payload.values = {user: {email: action.payload.values.email, name: action.payload.values.name}, roleable: "oem"}
//   yield call(inviteOemSaga, "post", action, normalizeOemInvite, handleOemInvite);
// }

const normalizeOemCreate = (value) => normalize(value, Schemas.oem).entities

function* handleOemCreate(newId){
  const pushAndNotifyFunc = pushAndNotify(`/clients/${newId}`, "Client was successfully added.");
  yield call(pushAndNotifyFunc);
}

export function* createOemSaga(action){
  //yield call(formSaga, "post", action, normalizeOemCreate, handleOemCreate);
  const response = yield call(API.post, action.payload.url, action.payload.values)
  const newId = response.id;
  const payload = yield call(normalizeOemCreate, {...response, ...action.payload.values});
  yield put({
    type: `${action.type}__SUCCESS`,
    payload
  })
  yield call(handleOemCreate, newId);
}
function* handleOemUpdate(response, {payload:{id}}){
  yield put(push(`/clients/${id}`))
  yield put(addToast("success", "Client successfully updated."))
}
export function* updateOemSaga(action){
  const values = {oem: {}}
  if(action.payload.values.name && action.payload.values.name.length > 0) values.oem.name = action.payload.values.name;
  if(action.payload.values.email && action.payload.values.email.length > 0) values.oem.email = action.payload.values.email;
  if(action.payload.values.password && action.payload.values.password.length > 0) values.oem.password = action.payload.values.password;
  action.payload.values = values;
  yield call(formSaga, "put", action, normalizeOem, handleOemUpdate);
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
