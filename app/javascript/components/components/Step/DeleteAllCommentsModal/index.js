import React from 'react';
import {useDispatch} from 'react-redux';
import DeleteConfirmation from '@components/Modal/DeleteConfirmation';
import activeModal from '@containers/activeModal';
import { deleteAllComments } from '@actions/comments';

export default activeModal(({modalData}) => {
  const dispatch = useDispatch();
  const handleYesClick = () => dispatch(deleteAllComments(modalData));
  return <DeleteConfirmation handleYesClick={handleYesClick} customText="Are you sure you want to delete all comments?" />
}, "delete_all_comments")
