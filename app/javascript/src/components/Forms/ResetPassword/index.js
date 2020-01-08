import React from 'react';
import PageLayout from '../../PageLayout';
import Form, {Input, FormError, SubmitButton} from '../Login';
import { resetPasswordSchema } from '../validation';
import { UPDATE_PASSWORD_REQUEST } from '../../../redux/types/auth';

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

export default ({match:{params:{reset_password_token}},history:{goBack}}) => (
  <PageLayout header="SET YOUR PASSWORD">
    <Form
      entity="password"
      url="/users/password"
      type={UPDATE_PASSWORD_REQUEST}
      initialValues={{password: '', password_confirmation: ''}}
      extraValues={{reset_password_token}}
      validationSchema={resetPasswordSchema}
      className="form_container"
      id={new Date().getTime()}
      submitOnEnter
    >
      {({handleSubmit, formKey, register}) => (<>
        <FormError formKey={formKey} large top />
        {inputs.map(input => <Input key={input.name} {...input} formKey={formKey} register={register} />)}
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
