import { call, put } from 'redux-saga/effects';
import API from '../../utils/API';
import {formSaga,pushAndNotify} from './form';
import {normalizeOEMInvite} from './oem';
function handleLoginResponse(response){
  localStorage.setItem('auth', JSON.stringify(response));
  API.setToken(response.jwt);
  return response;
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
