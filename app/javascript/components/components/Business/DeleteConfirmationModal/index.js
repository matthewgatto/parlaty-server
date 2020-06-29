import React from 'react';
import {useDispatch} from 'react-redux';
import DeleteConfirmation from '@components/Modal/DeleteConfirmation';
import withModal from '@containers/withModal';
import { deleteCategory } from '@actions/category';

export default withModal(({category_id}) => {
  const dispatch = useDispatch();
  const handleYesClick = () => dispatch(deleteCategory(category_id))
  return(
    <DeleteConfirmation handleYesClick={handleYesClick} entity="category" />
  )
}, "delete_category_confirmation")
