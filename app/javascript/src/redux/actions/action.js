import uuid from 'uuid/v4';
import * as types from '@types/action';

export const loadActionForms = (actions) => ({type: types.LOAD_ACTION_FORMS, payload: actions});
export const addActionForm = () => ({type: types.ADD_ACTION_FORM, payload: uuid()})
export const removeActionForm = (idx) => ({type: types.REMOVE_ACTION_FORM, payload: idx})
export const reorderActionForm = (from, to) => ({type: types.REORDER_ACTION_FORM, payload: {from, to}})
