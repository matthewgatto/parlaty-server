import React from 'react';
import FormContext from '@components/Form/Context';
import FormError from '@containers/FormError';
import { Input } from '@components/Inputs';
import ProcedureSubmitButton from '@containers/SubmitButton';
import FormPolygons from '@components/SVG/FormPolygons';
import { inviteSchema } from '@utils/validation';
import styles from './index.module.css';

export default ({rolePanel: Component, userRole, form}) => (
  <FormContext
    {...form}
    validationSchema={inviteSchema}
    className={styles.content}
  >
    {({handleSubmit, formKey}) => (<>
      <div>
        <div className={styles.margin}>
          <Input as="input" name="name" type="text" label="Name*" formKey={formKey} />
          <Input as="input" name="email" type="text" label="Email*" formKey={formKey} />
          <ProcedureSubmitButton formKey={formKey} onClick={handleSubmit} label="Submit" className={styles.submit} />
        </div>
        <FormError formKey={formKey} large className={styles.error} />
        <FormPolygons />
      </div>
      <div>
        <div className={styles.columnTitle}>Role Information</div>
        <div className={styles.rolePanel}>
          <Component formKey={formKey} initialValues={form.initialValues} userRole={userRole} />
        </div>
      </div>
    </>)}
  </FormContext>
)
