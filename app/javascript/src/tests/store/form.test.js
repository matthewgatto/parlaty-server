import reducer, {
  setFormErrors,
  SET_ERRORS,
  updateFormValue,
  UPDATE_FORM_VALUE,
  startProcessing,
  START_PROCESSING,
  setFormValues,
  SET_FORM_VALUES,
  updateChecklistValues,
  UPDATE_CHECKLIST_VALUES,
  openForm,
  OPEN_FORM,
  initialState
} from '../../store/form'
import { ADD_STEP_REQUEST__SUCCESS } from '../../store/procedure'
const errors = {form: 'step', error: 'Unable to process request', inputErrors: {name: true}}
const newFormValues = {form: 'step', name: 'title', value: 'test'}
const initialFormValues = {name: "test"}

describe('form actions', () => {
  it('should create an action to add errors to the form', () => {
    expect(setFormErrors(errors)).toEqual({
      type: SET_ERRORS,
      payload: errors
    })
  })
  it('should create an action to update form values', () => {
    expect(updateFormValue('step', 'title', 'test')).toEqual({
      type: UPDATE_FORM_VALUE,
      payload: newFormValues
    })
  })
  it('should create an action to set the processing state on a form', () => {
    expect(startProcessing('step')).toEqual({
      type: START_PROCESSING,
      payload: 'step'
    })
  })
  it('should create an action to set multiple form values', () => {
    expect(setFormValues('step', initialFormValues)).toEqual({
      type: SET_FORM_VALUES,
      payload: {form: 'step', values: initialFormValues}
    })
  })
  it('should create an action to update checkbox values', () => {
    expect(updateChecklistValues("step", "settings", 1)).toEqual({
      type: UPDATE_CHECKLIST_VALUES,
      payload: {
        form: "step",
        name: "settings",
        value: 1
      }
    })
  })
  it('should create an action to open/initialize a form state', () => {
    expect(openForm("step", "edit", 0, {title: "Step 1"})).toEqual({
      type: OPEN_FORM,
      payload: {
        form: "step",
        type: "edit",
        id: 0,
        values: {title: "Step 1"}
      }
    })
  })
})

describe('form reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should handle SET_ERRORS', () => {
    expect(
      reducer(undefined, {
        type: SET_ERRORS,
        payload: errors
      })
    ).toEqual({
      ...initialState,
      step: {
        error: errors.error,
        inputErrors: errors.inputErrors,
        isProcessing: false
      }
    })
  })
  it('should handle UPDATE_FORM_VALUE', () => {
    expect(
      reducer({...initialState, step: {values: {}, inputErrors: {}}}, {
        type: UPDATE_FORM_VALUE,
        payload: newFormValues
      })
    ).toEqual({
      ...initialState,
      [newFormValues.form]: {
        values: {
          [newFormValues.name]: newFormValues.value
        },
        inputErrors: {
          [newFormValues.name]: false
        }
      }
    })
  })

  it('should handle START_PROCESSING', () => {
    expect(
      reducer(undefined, {
        type: START_PROCESSING,
        payload: "step"
      })
    ).toEqual({
      ...initialState,
      step: {
        isProcessing: true
      }
    })
  })

  it('should handle SET_FORM_VALUES', () => {
    expect(
      reducer(undefined, {
        type: SET_FORM_VALUES,
        payload: {form: "step", values: initialFormValues }
      })
    ).toEqual({
      ...initialState,
      step: {
        values: initialFormValues,
        initialValues: initialFormValues
      }
    })
  })

  it('should handle UPDATE_CHECKLIST_VALUES', () => {
    expect(
      reducer({...initialState, step: {values: {ids: []}}}, {
        type: UPDATE_CHECKLIST_VALUES,
        payload: {form: "step", name: "ids", value: 1 }
      })
    ).toEqual({
      ...initialState,
      step: {
        values: {ids: [1]}
      }
    })

    expect(
      reducer({...initialState, step: {values: {ids: [1]}}}, {
        type: UPDATE_CHECKLIST_VALUES,
        payload: {form: "step", name: "ids", value: 1 }
      })
    ).toEqual({
      ...initialState,
      step: {
        values: {ids: []}
      }
    })

    expect(
      reducer({...initialState, step: {values: {ids: [1]}}}, {
        type: UPDATE_CHECKLIST_VALUES,
        payload: {form: "step", name: "ids", value: 2 }
      })
    ).toEqual({
      ...initialState,
      step: {
        values: {ids: [1,2]}
      }
    })

    expect(
      reducer({...initialState, step: {values: {}}}, {
        type: UPDATE_CHECKLIST_VALUES,
        payload: {form: "step", name: "ids", value: 1 }
      })
    ).toEqual({
      ...initialState,
      step: {
        values: {ids: [1]}
      }
    })
  })

  it('should handle OPEN_FORM', () => {
    expect(
      reducer(undefined, {
        type: OPEN_FORM,
        payload: {form: "step", type: "edit", id: 0, values: {title: "test"} }
      })
    ).toEqual({
      ...initialState,
      type: "edit",
      id: 0,
      step: {
        values: {title: "test"},
        initialValues: {title: "test"}
      }
    })
  })

  it('should handle ADD_STEP_REQUEST__SUCCESS', () => {
    expect(
      reducer(undefined, { type: ADD_STEP_REQUEST__SUCCESS })
    ).toEqual({
      ...initialState,
      type: null,
      id: null,
      step: null
    })
  })
})
