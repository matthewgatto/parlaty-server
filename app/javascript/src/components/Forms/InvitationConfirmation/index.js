import React from 'react';
import queryString from 'query-string';
import PageLayout from '../../PageLayout';
import Form, {Input, FormError, SubmitButton} from '../Login';
import { inviteConfirmationSchema } from '../validation';
import { CREATE_INVITE_CONFIRMATION_REQUEST } from '../../../redux/types/auth';

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

export default ({location:{search},history:{push}}) => (
  <PageLayout header="Set Your Password">
    <Form
      entity="invite_confirmation"
      url="/users/confirmation/password"
      type={CREATE_INVITE_CONFIRMATION_REQUEST}
      initialValues={{password: '', password_confirmation: ''}}
      extraValues={{confirmation_token: queryString.parse(search).confirmation_token}}
      validationSchema={inviteConfirmationSchema}
      id={new Date().getTime()}
      className="form_container"
    >
      {({handleSubmit, formKey, register}) => (<>
        <FormError formKey={formKey} large top />
        {inputs.map(input => <Input key={input.name} {...input} formKey={formKey} register={register} />)}
        <div className="form_buttons">
          <div onClick={() => {push('/')}} className="form_label">
            Cancel
          </div>
          <SubmitButton formKey={formKey} onClick={handleSubmit} label="Submit" />
        </div>
        </>)}
    </Form>
  </PageLayout>
)
