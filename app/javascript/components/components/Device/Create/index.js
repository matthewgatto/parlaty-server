import React from 'react';
import uuid from 'uuid/v4';
import DeviceForm from '../Form';
import { CREATE_PROCEDURE_DEVICE_REQUEST } from '@types/device';

export default ({procedure_id, modalData, name, ...props}) => {
  const id = uuid();
  return(
    <DeviceForm
      bar={{title: `Create ${name ? name : "Procedure"} Device`}}
      form={{
        entity: "copy_device",
        url: `/procedures/${procedure_id}`,
        type: CREATE_PROCEDURE_DEVICE_REQUEST,
        initialValues: modalData || {name: ''},
        extraValues: {procedure_id},
        id
      }}
    />
  )
}
