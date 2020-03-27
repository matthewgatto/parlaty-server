import uuid from 'uuid/v4';
import * as types from '@types/action';

export const loadActionForms = (actions) => ({type: types.LOAD_ACTION_FORMS, payload: actions.map(id => ({id, formId: uuid()}))});
export const addActionForm = (formValues, isDuplicate) => ({type: types.ADD_ACTION_FORM, payload: {formId: uuid(), formValues, isDuplicate}})
export const removeActionForm = (idx) => ({type: types.REMOVE_ACTION_FORM, payload: idx})
export const reorderActionForm = (from, to) => ({type: types.REORDER_ACTION_FORM, payload: {from, to}})
export const clearActionForms = () => ({type: types.CLEAR_ACTION_FORMS})
