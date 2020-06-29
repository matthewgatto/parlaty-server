import React from 'react';
import FormPage from '@components/Form/Page';
import { CREATE_PASSWORD_RESET_EMAIL_REQUEST } from '@types/auth';
import { forgotPasswordSchema } from '@utils/validation';

const inputs = [{
  type: "email",
  name: "email",
  label: "Email*",
  required: true
}]

export default () => (
  <FormPage
    layout={{header:"Get A Password Reset Email"}}
    form={{
      entity: "password_reset_email",
      url: '/users/password',
      type: CREATE_PASSWORD_RESET_EMAIL_REQUEST,
      initialValues: {email: ''},
      validationSchema: forgotPasswordSchema,
    }}
    inputs={inputs}
  />
)
