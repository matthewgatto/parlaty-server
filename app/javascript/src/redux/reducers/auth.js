import * as types from '../types/auth'

export default (state = null, action) => {
  if(action.type === types.CREATE_AUTH_REQUEST__SUCCESS){
    return action.payload
  }
  return state
}
