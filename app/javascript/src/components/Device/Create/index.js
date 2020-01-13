import React from 'react';
import DeviceForm from '../Form';
import { CREATE_DEVICE_REQUEST } from '../../../redux/types/device';

export default ({history:{goBack}}) => (
  <DeviceForm
    header="Create A New Device"
    url="/devices"
    type={CREATE_DEVICE_REQUEST}
    initialValues={{name: ''}}
    id={new Date().getTime()}
    goBack={goBack}
  />
)
