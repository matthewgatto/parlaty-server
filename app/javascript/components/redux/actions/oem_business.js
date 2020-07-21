import * as types from '@types/oem_business';

export const deleteOemBusiness = (oem_business_id) => ({type: types.DELETE_OEM_BUSINESS_REQUEST, payload: Number(oem_business_id)})
