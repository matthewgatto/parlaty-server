import React from 'react';
import { Link } from 'react-router-dom';
import FormWrapper from '../FormWrapper';
import FormError from '../../../containers/FormError';
import {Input} from '../Inputs';
import FormSubmitButton from '../../../containers/FormSubmitButton';
import { oemSchema } from '../validation';
import styles from './index.module.css';

export default function(props){
  return(
    <FormWrapper
      formik={{
        initialValues: props.initialValues || {},
        validationSchema: oemSchema,
        onSubmit: props.handleSubmit
      }}
    >
      <FormError entityKey="oems" id={props.id} large top />
      <Input label="Name*" type="text" name="name" />
      <Input label="Email*" type="email" name="email" />
      <Input label="New Password" type="password" name="password" />
      <div className={styles.buttons}>
        <Link to={`/oem/${props.id}`} className={styles.label}>
          Cancel
        </Link>
        <FormSubmitButton entityKey="oems" id={props.id} text="Submit"  />
      </div>
    </FormWrapper>
  )
}
