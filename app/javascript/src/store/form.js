import { ADD_STEP_REQUEST__SUCCESS } from './procedure';
export const SET_ERRORS = "SET_ERRORS";
export const RESET_FORM_STATE = "RESET_FORM_STATE";
export const UPDATE_FORM_VALUE = "UPDATE_FORM_VALUE";
export const START_PROCESSING = "START_PROCESSING";
export const SET_FORM_VALUES = "SET_FORM_VALUES";
export const UPDATE_CHECKLIST_VALUES = "UPDATE_CHECKLIST_VALUES";
export const OPEN_FORM = "OPEN_FORM";

export const setFormErrors = ({form, error, inputErrors}) => ({ type: SET_ERRORS, payload: {form, error, inputErrors } })
export const updateFormValue = (form, name, value) => ({type: UPDATE_FORM_VALUE, payload: {form, name, value}});
export const startProcessing = (form) => ({type: START_PROCESSING, payload: form})
export const setFormValues = (form, values) => ({type: SET_FORM_VALUES, payload: {form, values}})
export const updateChecklistValues = (form, name, value) => ({ type: UPDATE_CHECKLIST_VALUES, payload: {form, name, value}})
export const openForm = (form, type, id, values)=> ({type: OPEN_FORM, payload: {form, type, id, values}})

export const initialState = { type: null, id: null, procedure: {values: {}, initialValues: {}} };
export default function(previousState = initialState, { type, payload }){
  switch (type) {
    case SET_ERRORS:
      return {
        ...previousState,
        [payload.form]: {
          ...previousState[payload.form],
          error: payload.error,
          inputErrors: payload.inputErrors ||  {},
          isProcessing: false
        }
      }
    case UPDATE_FORM_VALUE:
      return {
        ...previousState,
        [payload.form]: {
          ...previousState[payload.form],
          values: {
            ...previousState[payload.form].values,
            [payload.name]: payload.value
          },
          inputErrors: {
            ...previousState[payload.form].inputErrors,
            [payload.name]: false
          }
        }
      }
    case START_PROCESSING:
      return {
        ...previousState,
        [payload]: {
          ...previousState[payload],
          isProcessing: true
        }
      }
    case SET_FORM_VALUES:
      return {
        ...previousState,
        [payload.form]: {
          ...previousState[payload.form],
          values: payload.values,
          initialValues: payload.values
        }
      };
    case UPDATE_CHECKLIST_VALUES:
      let form = previousState[payload.form];
      let values = form.values
      if(values[payload.name]){
        let index = values[payload.name].findIndex(id => payload.value == id);
        return {
          ...previousState,
          [payload.form]: {
            ...form,
            values: {
              ...values,
              [payload.name]: index === -1 ? [...values[payload.name], payload.value] : [...values[payload.name].slice(0, index), ...values[payload.name].slice(index + 1)]
            }
          }
        }
      } else {
        return {
          ...previousState,
          [payload.form]: {
            ...form,
            values: {
              ...values,
              [payload.name]: [payload.value]
            }
          }
        }
      }
    case OPEN_FORM:
      return {
        ...previousState,
        type: payload.type,
        id: payload.id,
        [payload.form]: {
          values: payload.values || {},
          initialValues: payload.values || {}
        }
      }
    case ADD_STEP_REQUEST__SUCCESS:
      return {
        ...previousState,
        type: null,
        id: null,
        step: null
      }
    default:
      return previousState;
  }
}
