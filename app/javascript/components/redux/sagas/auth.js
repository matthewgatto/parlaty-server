import {call, put, select} from 'redux-saga/effects';
import { normalize } from 'normalizr';
import API from '@utils/API';
import {formSaga, postSaga, pushAndNotify, goToSuccessPage} from './form';
import Schemas from '@utils/models';

function* handleActionSuccess(response, messages){
  yield call(response.role === "Operator" ? goToSuccessPage(messages.operator) : pushAndNotify("/", messages.user))
}

function handleInviteConfirmationSuccess(response){
  let messages = {
    operator: "Your password has been set. You may now login through the Parlaty iOS app.",
    user: "Your password has been set, you may now login."
  }
  return handleActionSuccess(response, messages);
}
function handleUpdatePasswordSuccess(response){
  let messages = {
    operator: "Your password was successfully updated.",
    user: "Your password was successfully updated."
  }
  return handleActionSuccess(response, messages);
}

function handlePasswordResetEmailSuccess(response){
  let messages = {
    operator: "A password recovery link has been sent to your email.",
    user: "A password recovery link has been sent to your email."
  }
  return handleActionSuccess(response, messages);
}

const makeAuthState = (user) => {
  const normalizedData = normalize(user, Schemas.user);
  const initialState = {auth: normalizedData.entities.users[normalizedData.result]}
  if(user.roleable_type === "Operator" || user.roleable_type === "Author"){
    initialState.oem_businesses = normalizedData.entities.oem_businesses
  } else if(user.roleable_type === "ClientAdmin"){
    initialState.oem_businesses = normalizedData.entities.oem_businesses
    initialState.oems = normalizedData.entities.oems
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
  action.payload.values.web_request = true;
  yield call(postSaga, action, handleLoginResponse);
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
  const {name,email,roleable,client,...oemBusinesses} = action.payload.values;
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
    body.oem_business_ids = []
    for (let oem_business_id in oemBusinesses) {
      if (oemBusinesses.hasOwnProperty(oem_business_id) && oemBusinesses[oem_business_id] === true && isNumber(oem_business_id)) {
        body.oem_business_ids.push(oem_business_id)
      }
    }
  }
  //action.payload.values = body
  //yield call(formSaga, "post", action, action.payload.values.roleable === "oem" && normalizeOemInvite, handleUserInvite);
}

export const inviteConfirmationSaga = makePasswordFormSaga("post", handleInviteConfirmationSuccess)
export const passwordResetEmailSaga = makePasswordFormSaga("post", handlePasswordResetEmailSuccess)
export const updatePasswordSaga = makePasswordFormSaga("put", handleUpdatePasswordSuccess)
