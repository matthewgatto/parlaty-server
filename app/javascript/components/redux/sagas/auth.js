import { call, put } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import API from '@utils/API';
import {formSaga,pushAndNotify} from './form';
import {normalizeOEMInvite} from './oem';
import Schemas from '@utils/models';

const handleUpdatePasswordSuccess = pushAndNotify('/',"Your password was successfully updated.")
const handlePasswordResetEmailSuccess = pushAndNotify('/',"A password recovery link has been sent to your email.")
const handleInviteConfirmationSuccess = pushAndNotify('/',"Your password has been set, you may now login.")

function handleLoginResponse({oem_businesses,/*devices,*/...auth}){
  const initialState = {auth};
  if(auth.roleable_type === "Oem"){
    const {entities:{oems,businesses}} = normalize({id: auth.user_id, name: auth.name, email: auth.email, businesses: oem_businesses}, Schemas.oem)
    initialState.oems = oems;
    initialState.businesses = businesses || {};
  }
  /*
  if(devices){
    const normalizedDeviceData = normalize(devices, [Schemas.device])
    initialState.devices = normalizedDeviceData.entities.devices;
    initialState.actions = normalizedDeviceData.entities.actions;
  }
  */
  localStorage.setItem('login_data_2_09', JSON.stringify(initialState));
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
  console.log("body", body);
  //action.payload.values = body
  //yield call(formSaga, "post", action, action.payload.values.roleable === "oem" && normalizeOEMInvite, handleUserInvite);
}

export const inviteConfirmationSaga = makePasswordFormSaga("post", handleInviteConfirmationSuccess)
export const passwordResetEmailSaga = makePasswordFormSaga("post", handlePasswordResetEmailSuccess)
export const updatePasswordSaga = makePasswordFormSaga("put", handleUpdatePasswordSuccess)
