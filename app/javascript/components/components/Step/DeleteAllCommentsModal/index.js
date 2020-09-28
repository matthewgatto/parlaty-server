import React from 'react';
import {useDispatch} from 'react-redux';
import DeleteConfirmation from '@components/Modal/DeleteConfirmation';
import activeModal from '@containers/activeModal';
import { deleteComment } from '@actions/step';

export default activeModal(({idx}) => {
  const dispatch = useDispatch();
  const handleYesClick = () => {
    debugger;
    dispatch(deleteComment(idx));
  }
  return(
    <DeleteConfirmation handleYesClick={handleYesClick} entity="comment" />
  )
}, "delete_all_comments")
