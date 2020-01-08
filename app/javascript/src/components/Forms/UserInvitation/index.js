import React from 'react';
import PageLayout from '../../PageLayout';
import Form, {Input, FormError, SubmitButton, Select} from '../Login';
import { inviteSchema } from '../validation';
import { CREATE_USER_REQUEST } from '../../../redux/types/auth';

const inputs = [{
  type: "email",
  name: "email",
  label: "Email*",
  required: true
}, {
  type: "text",
  name: "name",
  label: "Name*",
  required: true
}]
const ROLE_OPTIONS = [{value: "operator", label: "Operator"}, {value: "parlatyadmin", label: "Parlaty Admin"}, {value: "oem", label: "OEM"}]

export default ({history:{goBack}}) => (
  <PageLayout header="Send User Invitation">
    <Form
      entity="user"
      url="/users"
      type={CREATE_USER_REQUEST}
      initialValues={{email: '', name: '', roleable: "operator"}}
      validationSchema={inviteSchema}
      className="form_container"
      id={new Date().getTime()}
      submitOnEnter
    >
      {({handleSubmit, formKey}) => (<>
        <FormError formKey={formKey} large top />
        {inputs.map(input => <Input key={input.name} {...input} formKey={formKey} />)}
        <Select options={ROLE_OPTIONS} label="Role*" name="roleable" defaultValue="operator" />
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
