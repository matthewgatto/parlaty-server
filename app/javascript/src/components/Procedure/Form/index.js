import React from 'react';
import FormContext from '@components/Form/Context';
import { Input } from '@components/Inputs';
import FormPolygons from '@components/SVG/FormPolygons';
import AddStepFormButton from '@containers/AddStepFormButton';
import StepList from '@containers/StepList';
import FormError from '@containers/FormError';
import SubmitButton from '@containers/SubmitButton';
import { procedureSchema } from '@utils/validation';
import styles from './index.module.css';

export default (props) => (
  <FormContext
    {...props}
    entity="procedure"
    validationSchema={procedureSchema}
    className={styles.content}
  >
    {({handleSubmit, formKey}) => (<>
      <div>
        <div className={styles.margin}>
          <Input as="input" name="name" type="text" label="Procedure Name" formKey={formKey} />
          <Input as="textarea" label="Description" name="description" rows="6" formKey={formKey} />
        </div>
        <AddStepFormButton formKey={formKey} />
        <FormPolygons />
      </div>
      <div>
        <div className={styles.columnTitle}>Procedure Steps</div>
        <StepList procedure_id={props.procedure_id} formKey={formKey} initialStepIds={props.initialValues.steps} />
        <SubmitButton formKey={formKey} onClick={handleSubmit} label="Submit" className={styles.submit} />
        <FormError formKey={formKey} large className={styles.error} />
      </div>
    </>)}
  </FormContext>
)
