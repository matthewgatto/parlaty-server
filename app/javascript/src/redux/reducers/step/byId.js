import merge from 'lodash/merge';
import * as types from '../../types/step';
import {
  CREATE_PROCEDURE_REQUEST__SUCCESS,
  UPDATE_PROCEDURE_REQUEST__SUCCESS,
  FETCH_PROCEDURE_REQUEST__SUCCESS
} from '../../types/procedure';


export default (state = {}, {type,payload}) => {
  if(type === types.STEP_SAVE_REQUEST__SUCCESS
  || type === CREATE_PROCEDURE_REQUEST__SUCCESS
  || type === UPDATE_PROCEDURE_REQUEST__SUCCESS
  || type === FETCH_PROCEDURE_REQUEST__SUCCESS
  ) return merge({}, state, payload.steps)
  return state
}
