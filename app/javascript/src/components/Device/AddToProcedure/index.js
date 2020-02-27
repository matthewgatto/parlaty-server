import React from 'react';
import uuid from 'uuid/v4';
import DeviceForm from '../Form';
import { CREATE_DEVICE_REQUEST } from '@types/device';

export default ({procedure_id}) => (
  <DeviceForm
    header="New Procedure Device"
    url="/devices"
    type="ADD_TO_PROCEDURE"
    initialValues={{name: '', procedure_id}}
    id={uuid()}
  />
)
