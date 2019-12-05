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
  const entityKey = props.isEditing ? "procedures" : "creating"
  const id = props.isEditing ? props.procedure_id : props.initialValues.id
  return(
      <FormWrapper
        entityKey={entityKey}
        id={id}
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
                <AddStepButton procedure_id={props.procedure_id} isEditing={props.isEditing} pushStep={arrayHelpers.push} />
                <PolygonGroup className={styles.polygonContainer} />
              </div>
              <div>
                <div className={styles.columnTitle}>Procedure Steps</div>
                <StepList procedure_id={props.procedure_id} reorderStep={props.reorderStep} arrayHelpers={arrayHelpers} />
              </div>
              <div>
                <div className={styles.columnTitle}>Uploaded Imagery</div>
                <ImageList />
                <FormSubmitButton entityKey={entityKey} id={id} text="Submit" className={styles.submit} />
              </div>
            </>
          )}
        </FieldArray>
      </FormWrapper>
  )
}
