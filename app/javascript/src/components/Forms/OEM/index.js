import React from 'react';
import FormWrapper from '../FormWrapper';
import {Input} from '../Inputs';
import OEMUpdateFormSubmit from '../../../containers/OEMUpdateFormSubmit';
import { oemSchema } from '../validation';

export default function(props){
  return(
    <FormWrapper
      formik={{
        initialValues: props.initialValues || {},
        validationSchema: oemSchema,
        onSubmit: props.handleSubmit
      }}
    >
      <Input label="Name*" type="text" name="name" />
      <Input label="Email*" type="email" name="email" />
      <Input label="New Password" type="password" name="password" />
      <OEMUpdateFormSubmit text="Submit" id={props.id} />
    </FormWrapper>
  )
}
