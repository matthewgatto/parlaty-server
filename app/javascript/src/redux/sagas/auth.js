import { call, put } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import API from '../../utils/API';
import {formSaga,pushAndNotify} from './form';
import {normalizeOEMInvite} from './oem';
import Schemas from '../../utils/models';

function handleLoginResponse({oem_businesses,devices,...auth}){
  const user_data = {auth};
  if(auth.roleable_type === "Oem"){
    const {entities} = normalize({id: auth.user_id, name: auth.name, email: auth.email, businesses: oem_businesses}, Schemas.oem)
    user_data.oems = entities.oems;
    user_data.businesses = entities.businesses || {};
  }
  /*
  if(devices){
    user_data.devices = devices;
  }
  */
  localStorage.setItem('user_data', JSON.stringify(user_data));
  API.setToken(auth.jwt);
  return user_data;
}
const p = (i,x) => ({[i]:x})
export function* loginSaga(action){
  yield call(formSaga, "post", action, handleLoginResponse);
}

const handleUpdatePasswordSuccess = pushAndNotify('/',"Your password was successfully updated.")
const handlePasswordResetEmailSuccess = pushAndNotify('/',"A password recovery link has been sent to your email.")
const handleInviteConfirmationSuccess = pushAndNotify('/',"Your password has been set, you may now login.")

const makePasswordFormSaga = (method, cb) => (function*(action){
  const {password_confirmation, ...user} = action.payload.values;
  action.payload.values = p("user", user);
  yield call(formSaga, method, action, undefined, cb);
})

export const inviteConfirmationSaga = makePasswordFormSaga("post", handleInviteConfirmationSuccess)
export const passwordResetEmailSaga = makePasswordFormSaga("post", handlePasswordResetEmailSuccess)
export const updatePasswordSaga = makePasswordFormSaga("put", handlePasswordResetEmailSuccess)

const handleUserInvite = pushAndNotify('/', "An invitation link has been sent to the email provided.")
export function* inviteUserSaga(action){
  action.payload.values = {user: {email: action.payload.values.email, name: action.payload.values.name}, roleable: action.payload.values.roleable}
  yield call(formSaga, "post", action, action.payload.values.roleable === "oem" && normalizeOEMInvite, handleUserInvite);
}
