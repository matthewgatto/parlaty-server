import React from 'react';
import PageLayout from '../PageLayout';
import DeviceForm from '../Forms/Device';
import { CREATE_DEVICE_REQUEST } from '../../redux/types/device';

export default ({history:{goBack}}) => (
  <PageLayout header="Create A New Device">
    <DeviceForm
      url="/devices"
      type={CREATE_DEVICE_REQUEST}
      initialValues={{name: ''}}
      id={new Date().getTime()}
      goBack={goBack}
    />
  </PageLayout>
)
