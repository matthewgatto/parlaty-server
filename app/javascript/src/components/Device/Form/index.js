import React from 'react';
import FormPage from '../../FormPage';
import ActionFormList from '../../../containers/ActionFormList';
import { deviceSchema } from '../../../utils/validation';
import styles from './index.module.css';

const inputs = [{
  type: "text",
  name: "name",
  label: "Device Name*",
  required: true
}]

export default ({device_id, header,...props}) => (
  <FormPage
    header={header}
    form={{
      ...props,
      entity: "device",
      validationSchema: deviceSchema
    }}
    cancel="/devices"
    inputs={inputs}
  >
    <ActionFormList className={styles.actionsContainer} device_id={device_id} initialActions={props.initialValues && props.initialValues.actions}  />
  </FormPage>
)
