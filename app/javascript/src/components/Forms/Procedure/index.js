import React from 'react';
import { FieldArray } from 'formik';
import FormWrapper from '../FormWrapper';
import {Input, Textarea} from '../Inputs';
import StepList from '../../StepList';
import PolygonGroup from '../../SVG/PolygonGroup';
import Button from '../../Button';
import ImageList from '../../../containers/ImageList';
import AddStepButton from '../../../containers/AddStepButton';
import FormSubmitButton from '../../../containers/FormSubmitButton';
import { procedureSchema } from '../validation';
import styles from './index.module.css';

export default function(props){
  return(
      <FormWrapper
        formik={{
          initialValues: props.initialValues,
          validationSchema: procedureSchema,
          onSubmit: props.handleSubmit
        }}
        form={{
          className: styles.content,
          id: "procedure_form"
        }}
      >
        <FieldArray validateOnChange={false} name="steps">
          {arrayHelpers => (
            <>
              <div>
                <div className={styles.margin}>
                  <Input label="Procedure Name" name="name" type='text' />
                  <Textarea label="Description" name="description" />
                </div>
                <AddStepButton pushStep={arrayHelpers.push} />
                <PolygonGroup className={styles.polygonContainer} />
              </div>
              <div>
                <div className={styles.columnTitle}>Procedure Steps</div>
                <StepList arrayHelpers={arrayHelpers} />
              </div>
              <div>
                <div className={styles.columnTitle}>Uploaded Imagery</div>
                <ImageList />
                <FormSubmitButton text="Submit" className={styles.submit} />
              </div>
            </>
          )}
        </FieldArray>
      </FormWrapper>
  )
}
