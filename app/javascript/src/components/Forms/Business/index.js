import React from 'react';
import {useSelector} from 'react-redux'
import PageLayout from '../../PageLayout';
import Form, {Input, FormError, SubmitButton} from '../Login';
import { businessSchema } from '../validation';
import { CREATE_BUSINESS_REQUEST } from '../../../redux/types';

const inputs = [{
  type: "text",
  name: "name",
  label: "Name*",
  required: true
}]

export default ({match:{params},history:{goBack}}) => {
  const isAdmin = (params && params.oem_id) ? true : false
  const oem_id = isAdmin ? params.oem_id : useSelector(({auth}) => (auth && auth.roleable_type === "Oem") ? auth.roleable_id : undefined)
  return(
    <PageLayout header="New Business">
      <Form
        entity="business"
        url="/oem_businesses"
        type={CREATE_BUSINESS_REQUEST}
        initialValues={{email: ''}}
        extraValues={{oem_id}}
        validationSchema={businessSchema}
        className="form_container"
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
}
