import React from 'react';
import { Formik, Form } from 'formik';
import FormError from '../../../containers/FormError';
import styles from './index.module.css';

export default function(props){
  return(
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        {...props.formik}
      >
        <Form {...props.form}>
          {props.entityKey && <FormError entityKey={props.entityKey} id={props.id} className={styles.error} />}
          {props.children}
        </Form>
      </Formik>
  )
}
