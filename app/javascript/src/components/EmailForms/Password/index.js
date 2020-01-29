import React from 'react';
import FormPage from '../../Form/Page';

const inputs = [{
  type: "password",
  name: "password",
  label: "Password*",
  required: true
}, {
  type: "password",
  name: "password_confirmation",
  label: "Confirm Password*",
  required: true
}]

export default ({cancel,form}) => (
  <FormPage
    header="Set Your Password"
    form={{
      ...form,
      id: new Date().getTime()
    }}
    inputs={inputs}
  />
)
