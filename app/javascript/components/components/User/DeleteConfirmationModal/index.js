import React from 'react';
import {useDispatch} from 'react-redux';
import DeleteConfirmation from '@components/Modal/DeleteConfirmation';
import activeModal from '@containers/activeModal';
import { deleteUser } from '@actions/user';

export default activeModal(({id}) => {
  const dispatch = useDispatch();
  const handleYesClick = () => dispatch(deleteUser(id))
  return(
    <DeleteConfirmation handleYesClick={handleYesClick} entity="user" />
  )
}, "delete_user_confirmation")
