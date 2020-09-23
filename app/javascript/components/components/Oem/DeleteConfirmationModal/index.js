import React from 'react';
import {useDispatch} from 'react-redux';
import DeleteConfirmation from '@components/Modal/DeleteConfirmation';
import activeModal from '@containers/activeModal';
import { deleteClient } from '@actions/client';

export default activeModal(({client_id}) => {
  const dispatch = useDispatch();
  const handleYesClick = () => dispatch(deleteClient(client_id))
  return(
    <DeleteConfirmation handleYesClick={handleYesClick} entity="client" />
  )
}, "delete_client_confirmation")
