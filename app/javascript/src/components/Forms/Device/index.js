import React from 'react';
import PageLayout from '../../PageLayout';
import Form, {Input, FormError, SubmitButton} from '../Login';
import {ActionFieldsContainer} from '../StepList';
import { deviceSchema } from '../validation';

const inputs = [{
  type: "text",
  name: "name",
  label: "Device Name*",
  required: true
}]

export default ({goBack, device_id,...props}) => (
  <Form
    {...props}
    entity="device"
    validationSchema={deviceSchema}
    className="form_container"
    submitOnEnter
    nest
  >
    {({handleSubmit, formKey}) => (<>
      <FormError formKey={formKey} large top />
      {inputs.map(input => <Input key={input.name} {...input} formKey={formKey} />)}
      <ActionFieldsContainer device_id={device_id} initialActions={props.initialValues && props.initialValues.actions}  />
      <div className="form_buttons">
        <div onClick={goBack} className="form_label">
          Cancel
        </div>
        <SubmitButton formKey={formKey} onClick={handleSubmit} label="Submit" />
      </div>
      </>)}
  </Form>
)
