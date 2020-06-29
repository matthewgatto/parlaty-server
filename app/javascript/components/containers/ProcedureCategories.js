import React from 'react';
import {useSelector} from 'react-redux';
import CategorySelect from '@containers/CategorySelect';
import UserCategorySelect from '@containers/UserCategorySelect';
import {getProcedureCategories} from '@selectors/procedure';

export default ({procedure_id,oem_id,...props}) => {
  const categories = useSelector(getProcedureCategories(procedure_id))
  return oem_id ? (
    <CategorySelect defaultValue={categories} client={oem_id} />
  ) : (
    <UserCategorySelect defaultValue={categories} />
  )
}
