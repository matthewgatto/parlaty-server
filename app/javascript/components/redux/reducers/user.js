import { combineReducers } from 'redux';
import { addIds,immutableRemove } from '@utils';
import * as types from '@types/user';

const allUsers = (state = null, {type, payload}) => {
  switch (type) {
    case types.DELETE_USER_REQUEST__SUCCESS:
      return state.filter(id => id !== payload);
    case types.FETCH_USERS_REQUEST__SUCCESS:
    case types.CREATE_USER_REQUEST__SUCCESS:
      return addIds(state, payload.users)
    default:
      return state
  }
}

 const usersById = (state = {}, {type,payload}) => {
  switch (type) {
    case types.DELETE_USER_REQUEST__SUCCESS:
      return immutableRemove(payload, state);
    case types.FETCH_USERS_REQUEST__SUCCESS:
    case types.FETCH_USER_REQUEST__SUCCESS:
    case types.CREATE_USER_REQUEST__SUCCESS:
    case types.UPDATE_USER_REQUEST__SUCCESS:
      if(payload.users){
        return {
          ...state,
          ...payload.users
        }
      }
    default:
      return state
  }
}

export default combineReducers({
  byId: usersById,
  allIds: allUsers
})
