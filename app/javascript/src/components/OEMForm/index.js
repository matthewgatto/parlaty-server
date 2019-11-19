import React from 'react';
import { Formik, Form } from 'formik';
import {Input} from '../Inputs';
import OEMUpdateFormSubmit from '../../containers/OEMUpdateFormSubmit';
import styles from './index.module.css';
import { oemSchema } from '../../utils/validation';

export default function(props){
  return(
    <Formik
    initialValues={props.initialValues || {}}
    validationSchema={oemSchema}
    validateOnChange={false}
    validateOnBlur={false}
    onSubmit={props.handleSubmit}
    >
      <Form className={styles.content}>
        <Input label="Name*" type="text" name="name" />
        <Input label="Email*" type="email" name="email" />
        <Input label="New Password" type="password" name="password" />
        <OEMUpdateFormSubmit text="Submit" id={props.id} />
      </Form>
    </Formik>
  )
}
