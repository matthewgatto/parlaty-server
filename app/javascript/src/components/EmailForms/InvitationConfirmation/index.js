import React from 'react';
import PasswordForm from '../Password';
import queryString from 'query-string';
import { inviteConfirmationSchema } from '../../../utils/validation';
import { CREATE_INVITE_CONFIRMATION_REQUEST } from '../../../redux/types/auth';

export default ({location:{search}}) => (
    <PasswordForm
      form={{
        entity: "invite_confirmation",
        url: "/users/confirmation/password",
        type: CREATE_INVITE_CONFIRMATION_REQUEST,
        initialValues: {password: '', password_confirmation: ''},
        extraValues: {confirmation_token: queryString.parse(search).confirmation_token},
        validationSchema: inviteConfirmationSchema
      }}
      cancel="/"
    />
)
