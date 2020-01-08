import merge from 'lodash/merge'
import { combineReducers } from 'redux';
import uniq from 'lodash/uniq';
import { checkWith } from '../../utils';
import * as types from "../types/procedure";
import {
  FETCH_BUSINESS_PROCEDURES_REQUEST__SUCCESS
} from '../types/business';
import {
  STEP_SAVE_REQUEST__SUCCESS,
  REORDER_STEP_REQUEST__SUCCESS
} from '../types/step';

const shouldUpdateProcedureArray = checkWith((type) => (
  type === types.CREATE_PROCEDURE_REQUEST__SUCCESS
  || type === types.FETCH_PROCEDURE_REQUEST__SUCCESS
  || type === FETCH_BUSINESS_PROCEDURES_REQUEST__SUCCESS
),"procedures")
const allProcedures = (state = null, {type,payload}) => shouldUpdateProcedureArray(type, payload) ? (
  (state && state.length) ? uniq([...state,...Object.keys(payload.procedures)]) : Object.keys(payload.procedures)
) : (
  state
)

const shouldUpdateProcedureMap = checkWith((type, procedures) => (
  type === types.CREATE_PROCEDURE_REQUEST__SUCCESS
  || type === types.UPDATE_PROCEDURE_REQUEST__SUCCESS
  || type === types.FETCH_PROCEDURE_REQUEST__SUCCESS
  || type === FETCH_BUSINESS_PROCEDURES_REQUEST__SUCCESS
  || type === STEP_SAVE_REQUEST__SUCCESS
  || type === REORDER_STEP_REQUEST__SUCCESS
),"procedures")
const proceduresById = (state = {}, {type,payload}) => shouldUpdateProcedureMap(type, payload) ? (
  merge({}, state, payload.procedures)
) : (
  state
)

export default combineReducers({
  byId: proceduresById,
  allIds: allProcedures
})
