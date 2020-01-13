import React from 'react';
import FormPage from '../../FormPage';
import DeviceActions from '../../../containers/DeviceActions';
import { deviceSchema } from '../../../utils/validation';

const inputs = [{
  type: "text",
  name: "name",
  label: "Device Name*",
  required: true
}]

export default ({goBack, device_id, header,...props}) => (
  <FormPage
    header={header}
    form={{
      ...props,
      entity: "device",
      validationSchema: deviceSchema,
      className: "form_container",
      submitOnEnter: true
    }}
    handleCancel={goBack}
    inputs={inputs}
  >
    <DeviceActions device_id={device_id} initialActions={props.initialValues && props.initialValues.actions}  />
  </FormPage>
)
