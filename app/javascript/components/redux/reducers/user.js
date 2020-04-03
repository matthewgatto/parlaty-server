import merge from 'lodash/merge';
import { combineReducers } from 'redux';
import { addIds } from '@utils';
import * as types from '@types/user';

const allUsers = (state = null, {type, payload}) => {
  switch (type) {
    case types.DELETE_USER_REQUEST__SUCCESS:
      return state.filter(id => id !== payload);
    case types.FETCH_USERS_REQUEST__SUCCESS:
    case types.FETCH_USER_REQUEST__SUCCESS:
    case types.CREATE_USER_REQUEST__SUCCESS:
      return addIds(state, payload.users)
    default:
      return state
  }
}

 const usersById = (state = {}, {type,payload}) => {
  switch (type) {
    case types.DELETE_USER_REQUEST__SUCCESS:
      const {[payload]:removedUser,...remainingUsers} = state;
      return remainingUsers
    case types.FETCH_USERS_REQUEST__SUCCESS:
    case types.FETCH_USER_REQUEST__SUCCESS:
    case types.CREATE_USER_REQUEST__SUCCESS:
    case types.UPDATE_USER_REQUEST__SUCCESS:
      return merge({}, state, payload.users)
    default:
      return state
  }
}

export default combineReducers({
  byId: usersById,
  allIds: allUsers
})
