import React from 'react';
import { Link } from 'react-router-dom';
import FormWrapper from '../FormWrapper';
import {Input} from '../Inputs';
import OEMUpdateFormSubmit from '../../../containers/OEMUpdateFormSubmit';
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
      <Input label="Name*" type="text" name="name" />
      <Input label="Email*" type="email" name="email" />
      <Input label="New Password" type="password" name="password" />
      <div className={styles.buttons}>
        <Link to={`/oem/${props.id}`} className={styles.label}>
          Cancel
        </Link>
        <OEMUpdateFormSubmit text="Submit" id={props.id} />
      </div>

    </FormWrapper>
  )
}
