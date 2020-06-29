import React from 'react';
import {useDispatch} from 'react-redux';
import DeleteConfirmation from '@components/Modal/DeleteConfirmation';
import withModal from '@containers/withModal';
import { deleteDevice } from '@actions/device';

export default withModal(({procedure_id, modalData}) => {
  const dispatch = useDispatch();
  const handleYesClick = () => dispatch(deleteDevice(modalData, procedure_id));
  return(
    <DeleteConfirmation handleYesClick={handleYesClick} entity="device" />
  )
}, "delete_device_confirmation")
