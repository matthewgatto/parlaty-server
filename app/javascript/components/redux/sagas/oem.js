import { call, put,fork } from 'redux-saga/effects';
import uuid from 'uuid/v4'
import { normalize } from 'normalizr';
import { push } from 'connected-react-router';
import {getSaga} from './fetch';
import {formSaga,pushAndNotify} from './form';
import Schemas from '@utils/models';
import { addToast } from '@actions/toast';
import API from '@utils/API';

const normalizeOEMList = (response) => normalize(response, [Schemas.oem]).entities
const normalizeOEMBusinesses = ({name,oem_businesses},{payload:{id}}) => normalize({id,name,businesses: oem_businesses}, Schemas.oem).entities
const normalizeOEM = (response, {payload:{values:{oem},id}}) => normalize({...oem, id}, Schemas.oem).entities
export const normalizeOEMInvite = (response,{payload:{values:{user:{name}}}}) => normalize([{...response, name}], [Schemas.oem]).entities



const handleOEMInvite = pushAndNotify('/', "An invitation link has been sent to the email provided.")
export function* inviteOEMSaga(action){
  action.payload.values = {user: {email: action.payload.values.email, name: action.payload.values.name}, roleable: "oem"}
  yield call(formSaga, "post", action, normalizeOEMInvite, handleOEMInvite);
}

const normalizeOEMCreate = (response,{payload:{values}}) => normalize({...values,...response}, Schemas.oem).entities
function* handleOEMCreate(response,action){
  const pushAndNotifyFunc = pushAndNotify(`/oems/${response.id}`, "Client was successfully added.");
  yield call(pushAndNotifyFunc)
}

export function* createOEMSaga(action){
  //yield call(formSaga, "post", action, normalizeOEMCreate, handleOEMCreate);
  try {
    yield fork(API.post, action.payload.url, action.payload.values)
  } catch (e) {
    console.log("createOEMSaga error", e);
  }
  const fakeResponse = {id: uuid(),businesses:[]}
  const payload = yield call(normalizeOEMCreate, fakeResponse, action);
  yield put({
    type: `${action.type}__SUCCESS`,
    payload
  })
  yield call(handleOEMCreate, fakeResponse, action)
}
function* handleOEMUpdate(response, {payload:{id}}){
  yield put(push(`/oems/${id}`))
  yield put(addToast("success", "OEM successfully updated."))
}
export function* updateOEMSaga(action){
  const values = {oem: {}}
  if(action.payload.values.name && action.payload.values.name.length > 0) values.oem.name = action.payload.values.name;
  if(action.payload.values.email && action.payload.values.email.length > 0) values.oem.email = action.payload.values.email;
  if(action.payload.values.password && action.payload.values.password.length > 0) values.oem.password = action.payload.values.password;
  action.payload.values = values;
  yield call(formSaga, "put", action, normalizeOEM, handleOEMUpdate);
}

export function* oemListSaga(action){
  yield call(getSaga, action, normalizeOEMList);
}

export function* oemBusinessesSaga(action){
  yield call(getSaga, action, normalizeOEMBusinesses);
}
