import * as types from '@types/registration'

export default (state = null, {type, payload}) => {
  if(type === types.CREATE_REGISTRATION_REQUEST__SUCCESS){
    console.log('*** debug ****')
    return payload.auth
  }
  return state
}
