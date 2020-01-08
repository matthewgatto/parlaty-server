import * as types from '../types/auth'

export default (state = null, action) => action.type === types.CREATE_AUTH_REQUEST__SUCCESS ? (
  action.payload
) : (
  state
)
