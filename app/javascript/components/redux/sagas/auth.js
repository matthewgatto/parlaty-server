import { call, put } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import API from '@utils/API';
import {formSaga,pushAndNotify} from './form';
import {normalizeOEMInvite} from './oem';
import Schemas from '@utils/models';

const handleUpdatePasswordSuccess = pushAndNotify('/',"Your password was successfully updated.")
const handlePasswordResetEmailSuccess = pushAndNotify('/',"A password recovery link has been sent to your email.")
const handleInviteConfirmationSuccess = pushAndNotify('/',"Your password has been set, you may now login.")

const makeAuthState = (user) => {
  const normalizedData = normalize(user, Schemas.user);
  const initialState = {auth: normalizedData.entities.users[normalizedData.result]}
  if(user.roleable_type === "Oem"){
    const {entities:{oems,businesses}} = normalize({...user, businesses: oem_businesses}, Schemas.oem)
    initialState.oems = oems;
    initialState.businesses = businesses || {};
  } else if(user.roleable_type === "Operator" || user.roleable_type === "Author" || user.roleable_type === "ClientAdmin"){
    initialState.businesses = normalizedData.entities.businesses
  }
  return initialState
}

function handleLoginResponse(auth){
  const initialState = makeAuthState(auth);
  /*
  if(devices){
    const normalizedDeviceData = normalize(devices, [Schemas.device])
    initialState.devices = normalizedDeviceData.entities.devices;
    initialState.actions = normalizedDeviceData.entities.actions;
  }
  */
  localStorage.setItem('login_data_4_16', JSON.stringify({jwt: initialState.auth.jwt, id: initialState.auth.id, roleable: initialState.auth.roleable}));
  API.setToken(auth.jwt);
  return initialState;
}

const p = (i,x) => ({[i]:x})
export function* loginSaga(action){
  yield call(formSaga, "post", action, handleLoginResponse);
}


const makePasswordFormSaga = (method, cb) => (function*(action){
  const {password_confirmation, ...user} = action.payload.values;
  action.payload.values = p("user", user);
  yield call(formSaga, method, action, undefined, cb);
})



export function* selfDataSaga(action){
  try {
    const response = yield call(API.get, action.payload.url);
    const payload = makeAuthState(response)
    yield put({
      type: `CREATE_AUTH_REQUEST__SUCCESS`,
      payload
    })
  } catch (e) {

  }
}
const handleUserInvite = pushAndNotify('/', "An invitation link has been sent to the email provided.")
export function* inviteUserSaga(action){
  const {name,email,roleable,client,...categories} = action.payload.values;
  const body = {
    user: {
      name,
      email
    },
    roleable
  }
  if(roleable === "clientadmin"){
    body.client = client
  } else if(
    roleable === "author" ||
    roleable === "operator"
  ){
    body.categories = []
    for (var categoryId in categories) {
      if (categories.hasOwnProperty(categoryId) && categories[categoryId] === true && isNumber(categoryId)) {
        body.categories.push(categoryId)
      }
    }
  }
  //action.payload.values = body
  //yield call(formSaga, "post", action, action.payload.values.roleable === "oem" && normalizeOEMInvite, handleUserInvite);
}

export const inviteConfirmationSaga = makePasswordFormSaga("post", handleInviteConfirmationSuccess)
export const passwordResetEmailSaga = makePasswordFormSaga("post", handlePasswordResetEmailSuccess)
export const updatePasswordSaga = makePasswordFormSaga("put", handleUpdatePasswordSuccess)
