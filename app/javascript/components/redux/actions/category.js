import * as types from '@types/business';

export const deleteCategory = (category_id) => ({type: types.DELETE_CATEGORY_REQUEST, payload: Number(category_id)})
