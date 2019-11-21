import React from 'react';
import FormWrapper from '../FormWrapper';
import {Input} from '../Inputs';
import PageLayout from '../../PageLayout';
import FormSubmitButton from '../../../containers/FormSubmitButton';
import { resetPasswordSchema } from '../validation';

export default function(props){
  return(
    <PageLayout header={props.header}>
      <FormWrapper
        formik={{
          initialValues: props.initialValues,
          validationSchema: resetPasswordSchema,
          onSubmit: props.handleSubmit
        }}
      >
        <Input label="Password*" type="password" name="password" />
        <Input label="Confirm Password*" type="password" name="password_confirmation" />
        <FormSubmitButton text="Submit" />
      </FormWrapper>
    </PageLayout>
  )
}
