import React from 'react';
import PageLayout from '../../PageLayout';
import FormWrapper from '../FormWrapper';
import {Input} from '../Inputs';
import FormSubmitButton from '../../../containers/FormSubmitButton';
import { inviteConfirmationSchema } from '../validation';

export default function(props){
  return(
    <PageLayout header={props.header}>
      <FormWrapper
        entityKey="creating"
        id={props.initialValues.id}
        formik={{
          initialValues: props.initialValues,
          validationSchema: inviteConfirmationSchema,
          onSubmit: props.handleSubmit
        }}
      >
        <Input label="Password*" type="password" name="password" />
        <Input label="Confirm Password*" type="password" name="password_confirmation" />
        <FormSubmitButton entityKey="creating" text="Submit" id={props.initialValues.id} />
      </FormWrapper>
    </PageLayout>
  )
}
