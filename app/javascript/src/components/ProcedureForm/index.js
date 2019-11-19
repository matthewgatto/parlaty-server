import React from 'react';
import { Formik, FieldArray, Form } from 'formik';
import PageLayout from '../PageLayout';
import StepList from '../StepList';
import Polygon from '../SVG/PolygonV';
import {Input, Textarea} from '../Inputs';
import Button from '../Button';
import ImageList from '../../containers/ImageList';
import styles from './index.module.css';
import AddStepButton from '../../containers/AddStepButton';
import FormSubmitButton from '../../containers/FormSubmitButton';
import { procedureSchema } from '../../utils/validation';

export default function(props){
  return(
    <PageLayout header={props.header}>
      <Formik
      initialValues={props.initialValues}
      validationSchema={procedureSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={props.handleSubmit}
      >
        <FieldArray validateOnChange={false} name="steps">
          {arrayHelpers => (
            <Form id="procedure_form" className={styles.content}>
              <div>
                <div className={styles.margin}>
                  <Input label="Procedure Name" name="name" type='text' />
                  <Textarea label="Description" name="description" />
                </div>
                <AddStepButton pushStep={arrayHelpers.push} />
                <div className={styles.polygonContainer}>
                  <Polygon className={styles.polygonOne} fill="#c6c6c6" stroke="#c6c6c6" size="2.4em" />
                  <Polygon className={styles.polygonTwo} fill="#67318d" stroke="#67318d" size="1.2em" />
                  <Polygon className={styles.polygonThree} fill="none" stroke="#67318d" size="2.5em" />
                  <Polygon className={styles.polygonFour} fill="#ccbbd7" stroke="#ccbbd7" size="1.2em" />
                </div>
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
            </Form>
          )}
        </FieldArray>
      </Formik>
    </PageLayout>
  )
}
