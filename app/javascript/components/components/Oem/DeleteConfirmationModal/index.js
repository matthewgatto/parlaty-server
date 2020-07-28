import React from 'react';
import {useDispatch} from 'react-redux';
import DeleteConfirmation from '@components/Modal/DeleteConfirmation';
import withModal from '@containers/withModal';
import { deleteClient } from '@actions/client';

export default withModal(({client_id}) => {
  const dispatch = useDispatch();
  const handleYesClick = () => dispatch(deleteClient(client_id))
  return(
    <DeleteConfirmation handleYesClick={handleYesClick} entity="client" />
  )
}, "delete_client_confirmation")
