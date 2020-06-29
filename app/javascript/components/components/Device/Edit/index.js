import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import DeviceForm from '../Form';
import SubmitButton from '@components/SubmitButton';
import { UPDATE_DEVICE_REQUEST } from '@types/device';
import {getDeviceById} from '@selectors/device';
import {setModal} from '@actions/modal';

export default ({procedure_id, modalData, name}) => {
  const initialValues = useSelector(getDeviceById(modalData));
  const dispatch = useDispatch();
  const deleteDeviceClick = () => dispatch(setModal("delete_device_confirmation", modalData));
  return(
    <DeviceForm
      bar={{
        title: `Update ${name ? name : "Procedure"} Device`,
        right: <SubmitButton onClick={deleteDeviceClick} label="Delete Device" />
      }}
      form={{
        entity: "update_device_modal",
        url: `/devices/${modalData}`,
        type: UPDATE_DEVICE_REQUEST,
        initialValues: initialValues,
        id: modalData
      }}
    />
  )
}
