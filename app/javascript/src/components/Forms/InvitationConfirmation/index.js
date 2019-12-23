import React from 'react';
import PageLayout from '../../PageLayout';
import FormWrapper from '../FormWrapper';
import FormError from '../../../containers/FormError';
import {Input} from '../Inputs';
import FormSubmitButton from '../../../containers/FormSubmitButton';
import { inviteConfirmationSchema } from '../validation';

export default function(props){
  return(
    <PageLayout header={props.header}>
      <FormWrapper
        formik={{
          initialValues: props.initialValues,
          validationSchema: inviteConfirmationSchema,
          onSubmit: props.handleSubmit
        }}
      >
        <FormError entityKey="creating" id={props.initialValues.id} large top />
        <Input label="Password*" type="password" name="password" />
        <Input label="Confirm Password*" type="password" name="password_confirmation" />
        <FormSubmitButton entityKey="creating" text="Submit" id={props.initialValues.id} />
      </FormWrapper>
    </PageLayout>
  )
}
