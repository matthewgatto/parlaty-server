import React from 'react';
import { useSelector } from 'react-redux';
import PageLayout from '../PageLayout';
import Form, {Input, FormError, SubmitButton} from '../Forms/Login';
import BusinessList from '../Forms/BusinessList';
import { oemSchema } from '../Forms/validation';
import { UPDATE_OEM_REQUEST } from '../../redux/types/oem';

const inputs = [{
  type: "text",
  name: "name",
  label: "Name*",
  required: true
}, {
  type: "email",
  name: "email",
  label: "Email*",
  required: true
}, {
  type: "password",
  name: "password",
  label: "New Password*"
}]

export default ({history:{push},match:{params:{id}}}) => {
  const initialValues = useSelector(({oems:{byId:{[id]:oem}}}) => oem ? ({id: oem.id, name: oem.name, email: oem.email}) : undefined);
  return(
    <PageLayout header="Update OEM">
      <Form
        entity="oem"
        url={`/oems/${id}`}
        type={UPDATE_OEM_REQUEST}
        initialValues={initialValues}
        id={id}
        validationSchema={oemSchema}
        submitOnEnter
      >
        {({handleSubmit, formKey}) => (<>
          <FormError formKey={formKey} large top />
          {inputs.map(input => <Input key={input.name} {...input} formKey={formKey} />)}
          <div className="form_buttons">
            <div onClick={() => {push(`/oem/${id}`)}} className="form_label">
              Cancel
            </div>
            <SubmitButton formKey={formKey} onClick={handleSubmit} label="Submit" />
          </div>
          </>)}
      </Form>
    </PageLayout>
  )
}
