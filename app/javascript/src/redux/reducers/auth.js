import * as types from '../types/auth'

export default (state = null, {type, payload}) => {
  if(type === types.CREATE_AUTH_REQUEST__SUCCESS){
    return payload.auth
  }
  return state
}
