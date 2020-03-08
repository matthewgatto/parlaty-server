import * as types from '@types/procedure';

export const deleteProcedure = (procedure_id) => ({type: types.DELETE_PROCEDURE_REQUEST, payload: procedure_id})
