import * as types from '../types'

const initialState = {};
export default function(previousState = initialState, { type, payload }){
  switch (type) {
    case types.LOGIN_REQUEST:
      return {
        ...previousState,
        isLoading: true
      }
    case types.LOGIN_REQUEST__SUCCESS:
      return payload;
    case types.LOGIN_REQUEST__FAILURE:
      return {
        ...previousState,
        error: payload,
        isLoading: false
      };
    case types.LOGOUT:
      return initialState
    default:
      return previousState;
  }
}
