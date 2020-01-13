import React from 'react';
import PasswordForm from '../Password';
import { resetPasswordSchema } from '../../../utils/validation';
import { UPDATE_PASSWORD_REQUEST } from '../../../redux/types/auth';

export default ({match:{params:{reset_password_token}},history:{goBack}}) => (
  <PasswordForm
    form={{
      entity: "password",
      url: "/users/password",
      type: UPDATE_PASSWORD_REQUEST,
      initialValues: {password: '', password_confirmation: ''},
      extraValues: {reset_password_token},
      validationSchema: resetPasswordSchema,
    }}
    handleCancel={goBack}
  />
)
