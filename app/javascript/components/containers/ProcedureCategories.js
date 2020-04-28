import React from 'react';
import {useSelector} from 'react-redux';
import CategorySelect from '@containers/CategorySelect';
import {getProcedureCategories} from '@selectors/procedure';

export default ({procedure_id,oem_id}) => {
  const categories = useSelector(getProcedureCategories(procedure_id))
  return <CategorySelect defaultValue={categories} client={oem_id} />
}
