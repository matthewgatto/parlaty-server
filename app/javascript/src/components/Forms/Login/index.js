import React from 'react';
import { Input } from '../Inputs';
import FormWrapper from '../FormWrapper';
import SubmitButton from '../../../containers/SubmitButton';
import { loginSchema } from '../validation';

export default function(props){
  return(
    <FormWrapper
      formik={{
        initialValues: {email: '', password: ''},
        validationSchema: loginSchema,
        onSubmit: props.handleLoginSubmit
      }}
    >
      <Input type="email" name="email" placeholder="Email/Username" />
      <Input type="password" name="password" placeholder="Password" />
      <SubmitButton label="Login" />
    </FormWrapper>
  )
}
