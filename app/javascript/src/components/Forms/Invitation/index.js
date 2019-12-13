import React from 'react';
import PageLayout from '../../PageLayout';
import FormWrapper from '../FormWrapper';
import {Input} from '../Inputs';
import FormSubmitButton from '../../../containers/FormSubmitButton';
import { inviteSchema } from '../validation';
import styles from './index.module.css';

export default function(props){
  return(
    <PageLayout header={props.header}>
      <FormWrapper
        entityKey="creating"
        id={props.initialValues.id}
        formik={{
          initialValues: props.initialValues,
          validationSchema: inviteSchema,
          onSubmit: props.handleSubmit
        }}
      >
        <Input label="Email*" type="email" name="email" />
        <Input label="Name*" type="text" name="name" />
        <div className={styles.buttons}>
          <div onClick={props.back} className={styles.label}>
            Cancel
          </div>
          <FormSubmitButton entityKey="creating" text="Submit" id={props.initialValues.id} />
        </div>
      </FormWrapper>
    </PageLayout>
  )
}
