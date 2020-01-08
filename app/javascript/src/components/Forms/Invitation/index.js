import React from 'react';
import PageLayout from '../../PageLayout';
import Form, {Input, FormError, SubmitButton} from '../Login';
import { inviteSchema } from '../validation';
import { CREATE_OEM_REQUEST } from '../../../redux/types/oem';

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

export default ({match:{params:{roleable}},history:{goBack}}) => (
  <PageLayout header="Send User Invitation">
    <Form
      entity="oem"
      url="/users"
      type={CREATE_OEM_REQUEST}
      initialValues={{email: '', name: ''}}
      validationSchema={inviteSchema}
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
