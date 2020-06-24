import * as types from '@types/oem';

export const deleteClient = (client_id) => ({type: types.DELETE_CLIENT_REQUEST, payload: client_id})
