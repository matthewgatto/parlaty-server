import React from 'react';
import qs from 'query-string';
import PasswordForm from '../Password';
import { resetPasswordSchema } from '@utils/validation';
import { UPDATE_PASSWORD_REQUEST } from '@types/auth';

export default ({location:{search}}) => {
  const {reset_password_token} = qs.parse(search);
  return(
    <PasswordForm
      form={{
        entity: "password",
        url: "/users/password",
        type: UPDATE_PASSWORD_REQUEST,
        initialValues: {password: '', password_confirmation: ''},
        extraValues: {reset_password_token},
        validationSchema: resetPasswordSchema,
      }}
    />
  )
}
