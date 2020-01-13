import React from 'react';
import PageLayout from '../PageLayout';
import Form from '../Form';
import FormError from '../../containers/FormError';
import SubmitButton from '../../containers/SubmitButton';
import {Input} from '../Inputs';

export default ({header, form, handleCancel, children, inputs}) => (
  <PageLayout header={header}>
    <Form {...form}>
      {({handleSubmit, formKey}) => (<>
        <FormError formKey={formKey} large top />
        {inputs.map(input => <Input key={input.name} {...input} formKey={formKey} />)}
        {children && children}
        <div className="form_buttons">
          <div onClick={handleCancel} className="form_label">
            Cancel
          </div>
          <SubmitButton formKey={formKey} onClick={handleSubmit} label="Submit" />
        </div>
        </>)}
    </Form>
  </PageLayout>
)
