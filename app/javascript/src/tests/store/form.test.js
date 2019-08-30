import {
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
  OPEN_FORM
} from '../../store/form'

describe('form actions', () => {
  it('should create an action to add errors to the form', () => {
    const errors = {form: 'step', error: 'Unable to process request', inputErrors: {name: true}}
    expect(setFormErrors(errors)).toEqual({
      type: SET_ERRORS,
      payload: errors
    })
  })
  it('should create an action to update form values', () => {
    expect(updateFormValue('step', 'title', 'test')).toEqual({
      type: UPDATE_FORM_VALUE,
      payload: {form: 'step', name: 'title', value: 'test'}
    })
  })
  it('should create an action to set the processing state on a form', () => {
    expect(startProcessing('step')).toEqual({
      type: START_PROCESSING,
      payload: 'step'
    })
  })
  it('should create an action to set multiple form values', () => {
    const formValues = {name: "test"}
    expect(setFormValues('step', formValues)).toEqual({
      type: SET_FORM_VALUES,
      payload: {form: 'step', values: formValues}
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
