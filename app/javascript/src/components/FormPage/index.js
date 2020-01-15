import React from 'react';
import { Link } from 'react-router-dom'
import PageLayout from '../PageLayout';
import Form from '../Form';
import FormError from '../../containers/FormError';
import SubmitButton from '../../containers/SubmitButton';
import {Input} from '../Inputs';
import styles from './index.module.css';

export default ({header, form, cancel, children, inputs}) => (
  <PageLayout header={header}>
    <Form className={styles.container} submitOnEnter {...form} >
      {({handleSubmit, formKey}) => (<>
        <FormError formKey={formKey} large top />
        {inputs.map(input => <Input key={input.name} {...input} formKey={formKey} />)}
        {children && children}
        <div className={`${styles.buttons} align_center`}>
          <Link to={cancel || '/'} className={styles.label}>
            Cancel
          </Link>
          <SubmitButton formKey={formKey} onClick={handleSubmit} label="Submit" />
        </div>
        </>)}
    </Form>
  </PageLayout>
)
