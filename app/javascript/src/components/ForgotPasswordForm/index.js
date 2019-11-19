import React from 'react';
import { Formik, Form } from 'formik';
import PageLayout from '../PageLayout';
import {Input} from '../Inputs';
import FormSubmitButton from '../../containers/FormSubmitButton';
import styles from './index.module.css';
import { forgotPasswordSchema } from '../../utils/validation';

export default function(props){
  return(
    <PageLayout header={props.header}>
      <Formik
        initialValues={props.initialValues}
        validationSchema={forgotPasswordSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={props.handleSubmit}
      >
        <Form className={styles.content}>
          <Input label="Email*" type="email" name="email" />
          <FormSubmitButton text="Submit" />
        </Form>
      </Formik>
    </PageLayout>
  )
}
