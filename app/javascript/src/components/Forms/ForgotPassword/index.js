import React from 'react';
import PageLayout from '../../PageLayout';
import Form, {Input, FormError, SubmitButton} from '../Login';
import { CREATE_PASSWORD_RESET_EMAIL_REQUEST } from '../../../redux/types/auth';
import { forgotPasswordSchema } from '../validation';

const inputs = [{
  type: "email",
  name: "email",
  label: "Email*",
  required: true
}]

export default ({history:{goBack}}) => (
  <PageLayout header="Get A Password Reset Email">
    <Form
      entity="password_reset_email"
      url='/users/password'
      type={CREATE_PASSWORD_RESET_EMAIL_REQUEST}
      initialValues={{email: ''}}
      validationSchema={forgotPasswordSchema}
      className="form_container"
      id={new Date().getTime()}
      submitOnEnter
    >
      {({handleSubmit, formKey}) => (<>
        <FormError formKey={formKey} large top />
        {inputs.map(input => <Input key={input.name} {...input} formKey={formKey} />)}
        <div className="form_buttons">
          <div onClick={goBack} className="form_label">
            Cancel
          </div>
          <SubmitButton formKey={formKey} onClick={handleSubmit} label="Submit" />
        </div>
        </>)}
    </Form>
  </PageLayout>
)
