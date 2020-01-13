import React from 'react';
import FormPage from '../../FormPage';

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

export default ({handleCancel,form}) => (
  <FormPage
    header="Set Your Password"
    form={{
      ...form,
      id: new Date().getTime(),
      className: "form_container",
      submitOnEnter: true
    }}
    handleCancel={handleCancel}
    inputs={inputs}
  />
)
