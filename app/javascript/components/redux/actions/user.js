import * as types from '@types/user';

export const deleteUser = (id) => ({type: types.DELETE_USER_REQUEST, payload: id})
export const fetchUsers = () => ({type: types.FETCH_USERS_REQUEST, payload: {url: "/users"}})
