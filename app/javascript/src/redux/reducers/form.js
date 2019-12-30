import * as types from '../types'

export const initialState = {meta: {}};
export default function(state = initialState, { type, payload, meta }){
  switch (type) {
    case types.SET_STEP:
      return {
        ...state,
        step: payload
      }
    case types.STEP_SUBMIT_CLICK:
      return {
        ...state,
        step: {
          ...state.step,
          error: false,
          isProcessing: true
        }
      }
    case types.LOGOUT:
    case types.CLEAR_FORM:
      return initialState;
    default:
      return state;
  }
}
