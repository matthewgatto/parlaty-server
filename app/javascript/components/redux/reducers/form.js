import * as authTypes from '@types/auth'
import * as oemTypes from '@types/oem'
import * as businessTypes from '@types/business'
import * as procedureTypes from '@types/procedure'
import * as stepTypes from '@types/step'
import * as formTypes from '@types/form';
import * as deviceTypes from '@types/device';
import * as userTypes from '@types/user';

const startFormProcessing = (state,id) => ({
  ...state,
  [id]: {
    ...state[id],
    isProcessing: true,
    errors: {}
  }
})
const mountForm = (state,{id,initialValues}) => ({
  ...state,
  [id]: { initialValues }
})

const unmountForm = (state, id) => {
  const {[id]: removedForm, ...stateWithoutForm} = state;
  return stateWithoutForm;
}

const setFormErrors = (state, {formKey,errors}) => ({
  ...state,
  [formKey]: {
    ...state[formKey],
    errors,
    isProcessing: false
  }
})

const isFormSubmitAction = (type) => (
  type === authTypes.CREATE_AUTH_REQUEST
  || type === authTypes.CREATE_INVITE_CONFIRMATION_REQUEST
  || type === authTypes.CREATE_PASSWORD_RESET_EMAIL_REQUEST
  || type === authTypes.UPDATE_PASSWORD_REQUEST
  || type === userTypes.CREATE_USER_REQUEST
  || type === userTypes.UPDATE_USER_REQUEST
  || type === oemTypes.CREATE_OEM_REQUEST
  || type === oemTypes.UPDATE_OEM_REQUEST
  || type === businessTypes.CREATE_BUSINESS_REQUEST
  || type === procedureTypes.CREATE_PROCEDURE_REQUEST
  || type === procedureTypes.UPDATE_PROCEDURE_REQUEST
  || type === stepTypes.CREATE_STEP_REQUEST
  || type === stepTypes.UPDATE_STEP_REQUEST
  || type === stepTypes.STEP_SAVE_REQUEST
  || type === deviceTypes.CREATE_DEVICE_REQUEST
  || type === deviceTypes.UPDATE_DEVICE_REQUEST
  || type === deviceTypes.CREATE_PROCEDURE_DEVICE_REQUEST
  || type === "UPDATE_PROCEDURE_CATEGORIES_REQUEST"
)

const isFormSubmitFailureAction = (type) => (
  type === authTypes.CREATE_AUTH_REQUEST__FAILURE
  || type === authTypes.CREATE_INVITE_CONFIRMATION_REQUEST__FAILURE
  || type === authTypes.CREATE_PASSWORD_RESET_EMAIL_REQUEST__FAILURE
  || type === authTypes.UPDATE_PASSWORD_REQUEST__FAILURE
  || type === userTypes.CREATE_USER_REQUEST__FAILURE
  || type === userTypes.UPDATE_USER_REQUEST__FAILURE
  || type === oemTypes.CREATE_OEM_REQUEST__FAILURE
  || type === oemTypes.UPDATE_OEM_REQUEST__FAILURE
  || type === businessTypes.CREATE_BUSINESS_REQUEST__FAILURE
  || type === procedureTypes.CREATE_PROCEDURE_REQUEST__FAILURE
  || type === procedureTypes.UPDATE_PROCEDURE_REQUEST__FAILURE
  || type === stepTypes.CREATE_STEP_REQUEST__FAILURE
  || type === stepTypes.UPDATE_STEP_REQUEST__FAILURE
  || type === stepTypes.STEP_SAVE_REQUEST__FAILURE
  || type === deviceTypes.CREATE_DEVICE_REQUEST__FAILURE
  || type === deviceTypes.UPDATE_DEVICE_REQUEST__FAILURE
  || type === deviceTypes.CREATE_PROCEDURE_DEVICE_REQUEST__FAILURE
  || type === "UPDATE_PROCEDURE_CATEGORIES_REQUEST__FAILURE"
)

export const initialState = {};
export default (state = initialState, {type, payload}) => {
  if(isFormSubmitAction(type)){
    return startFormProcessing(state, payload.formKey)
  }
  if(isFormSubmitFailureAction(type)){
    return setFormErrors(state, payload)
  }
  if(type === stepTypes.STEP_SAVE_REQUEST__SUCCESS){
    return {
      ...state,
      [payload.formKey]: {
        ...state[payload.formKey],
        isProcessing: false
      }
    }
  }
  if(type === formTypes.MOUNT_FORM){
    return mountForm(state, payload)
  }
  if(type === formTypes.UNMOUNT_FORM){
    return unmountForm(state, payload)
  }
  return state
}
