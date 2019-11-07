import { ADD_STEP_REQUEST__SUCCESS, EDIT_STEP_REQUEST__SUCCESS } from './procedure';
export const SET_ERRORS = "SET_ERRORS";
export const UPDATE_FORM_VALUE = "UPDATE_FORM_VALUE";
export const START_PROCESSING = "START_PROCESSING";
export const SET_FORM_VALUES = "SET_FORM_VALUES";
export const UPDATE_CHECKLIST_VALUES = "UPDATE_CHECKLIST_VALUES";
export const OPEN_FORM = "OPEN_FORM";
export const CLOSE_FORM = "CLOSE_FORM";
export const UPDATE_ACTION_VALUE = "UPDATE_ACTION_VALUE";
export const ADD_ACTION = "ADD_ACTION";
export const REMOVE_ACTION = "REMOVE_ACTION";
export const REORDER_ACTION = "REORDER_ACTION";

export const setFormErrors = ({form, error, inputErrors}) => ({ type: SET_ERRORS, payload: {form, error, inputErrors } })
export const updateFormValue = (form, name, value) => ({type: UPDATE_FORM_VALUE, payload: {form, name, value}});
export const startProcessing = (form) => ({type: START_PROCESSING, payload: form})
export const setFormValues = (form, values) => ({type: SET_FORM_VALUES, payload: {form, values}})
export const updateChecklistValues = (form, name, value) => ({ type: UPDATE_CHECKLIST_VALUES, payload: {form, name, value}})
export const openForm = (form, type, id, values) => ({type: OPEN_FORM, payload: {form, type, id, values}})
export const closeForm = () => ({type: CLOSE_FORM})
export const updateActionValue = (idx, value) => ({type: UPDATE_ACTION_VALUE, payload: {value, idx}})
export const addAction = () => ({type: ADD_ACTION});
export const removeAction = (idx) => ({type: REMOVE_ACTION, payload: idx});
export const reorderAction = (fromIdx, toIdx) => ({type: REORDER_ACTION, payload: {fromIdx, toIdx}})

export const initialState = { type: null, id: null, procedure: {values: {}, initialValues: {}}, step: {values: {actions: []}, initialValues: {actions: []}} };
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
          values: {actions: [], ...payload.values},
          initialValues: {actions: [], ...payload.values}
        }
      }
    case CLOSE_FORM:
      return {
        ...previousState,
        id: null,
        type: null,
        step: {values: {actions:[]}, initialValues: {actions:[]}}
      };
    case EDIT_STEP_REQUEST__SUCCESS:
    case ADD_STEP_REQUEST__SUCCESS:
      return {
        ...previousState,
        type: null,
        id: null,
        step: {values: {actions:[]}, initialValues: {actions:[]}}
      }
    case UPDATE_ACTION_VALUE:
      return {
        ...previousState,
        step: {
          ...previousState.step,
          values: {
            ...previousState.step.values,
            actions: previousState.step.values.actions.map((action, i) => i === payload.idx ? payload.value : action)
          }
        }
      }
    case ADD_ACTION:
      return {
        ...previousState,
        step: {
          ...previousState.step,
          values: {
            ...previousState.step.values,
            actions: [...previousState.step.values.actions, '']
          }
        }
      }
    case REMOVE_ACTION:
      return {
        ...previousState,
        step: {
          ...previousState.step,
          values: {
            ...previousState.step.values,
            actions: [...previousState.step.values.actions.slice(0, payload), ...previousState.step.values.actions.slice(payload + 1)]
          }
        }
      }
    case REORDER_ACTION:
      let actions = [...previousState.step.values.actions];
      let action = actions[payload.fromIdx];
      actions[payload.fromIdx] = actions[payload.toIdx]
      actions[payload.toIdx] = action
      return {
        ...previousState,
        step: {
          ...previousState.step,
          values: {
            ...previousState.step.values,
            actions
          }
        }
      }
    default:
      return previousState;
  }
}
