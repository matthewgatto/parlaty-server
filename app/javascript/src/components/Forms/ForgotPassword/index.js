import React from 'react';
import PageLayout from '../../PageLayout';
import FormWrapper from '../FormWrapper';
import {Input} from '../Inputs';
import FormSubmitButton from '../../../containers/FormSubmitButton';
import { forgotPasswordSchema } from '../validation';

export default function(props){
  return(
    <PageLayout header={props.header}>
      <FormWrapper
        formik={{
          initialValues: props.initialValues,
          validationSchema: forgotPasswordSchema,
          onSubmit: props.handleSubmit
        }}
      >
        <Input label="Email*" type="email" name="email" />
        <FormSubmitButton text="Submit" />
      </FormWrapper>
    </PageLayout>
  )
}
