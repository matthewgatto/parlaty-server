import merge from 'lodash/merge'
import * as types from '../types'


const initialState = {oems: {}, businesses: {}, procedures: {}, steps: {}, landing: {}};
export default function(state = initialState, {type, entityKey, entities, id, meta, payload}){
  switch (type) {
    case types.RECIEVE_ENTITIES:
      return merge({}, state, entities);
    case types.DELETE_STEP_REQUEST__SUCCESS:
      const { [payload.id]: deletedStep, ...steps} = state.steps;
      const oldProcedure = state.procedures[payload.procedure_id];
      const newProcedure = {
        ...oldProcedure,
        steps: [...oldProcedure.steps.slice(0, payload.idx), ...oldProcedure.steps.slice(payload.idx + 1)]
      }
      return {
        ...state,
        procedures: {
          ...state.procedures,
          [payload.procedure_id]: {...oldProcedure,...newProcedure}
        }
      }
    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
}
