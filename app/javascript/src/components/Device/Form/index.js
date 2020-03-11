import React from 'react';
import ActionFormList from '@containers/ActionFormList';
import AddActionFormButton from '@containers/AddActionFormButton';
import SubmitButton from '@containers/SubmitButton';
import FormError from '@containers/FormError';
import Bar from '@components/Bar/Large';
import Form from '@components/Form/NewContext';
import { Input } from '@components/Inputs';
import styles from './index.module.css';

const inputs = [{
  type: "text",
  name: "name",
  label: "Device Name*",
  required: true
}]

export default ({bar, form}) => (
  <div className={styles.modalContainer}>
    <Bar {...bar} />
    <Form {...form} className={styles.content}>
      {({handleSubmit, formKey}) => (<>
          <div>
          <FormError formKey={formKey} large top />
          <div className={styles.margin}>
            <Input as="input" name="name" type="text" label="Name" formKey={formKey} defaultValue={form.initialValues && form.initialValues.name} />
          </div>
          </div>
          <div>
            <div className={styles.columnTitle}>Device Actions</div>
            <ActionFormList formKey={formKey} initialActions={form.initialValues && form.initialValues.actions} />
            <AddActionFormButton formKey={formKey} />
            <SubmitButton formKey={formKey} onClick={handleSubmit} label="Save" className={styles.submit} />
          </div>
        </>)}
    </Form>
  </div>
)
