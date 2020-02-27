import React from 'react';
import uuid from 'uuid/v4';
import DeviceForm from '../Forms/Page';
import { CREATE_DEVICE_REQUEST } from '@types/device';

export default () => (
  <DeviceForm
    header="Create A New Device"
    url="/devices"
    type={CREATE_DEVICE_REQUEST}
    initialValues={{name: ''}}
    id={uuid()}
  />
)
