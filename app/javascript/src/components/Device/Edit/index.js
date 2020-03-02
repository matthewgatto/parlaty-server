import React from 'react';
import { useSelector } from 'react-redux';
import DeviceForm from '../Forms/Page';
import { UPDATE_DEVICE_REQUEST } from '@types/device';
import {getDeviceById} from '@selectors/device';

export default ({match:{params:{id}}}) => {
  const initialValues = useSelector(getDeviceById(id));
  return(
    <DeviceForm
      entity="edit_device_page"
      header="Update Device"
      url={`/devices/${id}`}
      type={UPDATE_DEVICE_REQUEST}
      initialValues={initialValues}
      id={id}
    />
  )
}
