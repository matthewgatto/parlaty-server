import * as types from '@types/oem_business';

export const deleteOemBusiness = (oem_business_id) => ({type: types.DELETE_OEM_BUSINESS_REQUEST, payload: Number(oem_business_id)});
export const getOemBusinessProceduresList = () => ({type: types.FETCH_OEM_BUSINESS_PROCEDURES_LIST_REQUEST, payload: {}});