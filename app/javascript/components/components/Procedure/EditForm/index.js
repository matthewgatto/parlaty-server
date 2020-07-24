import React from 'react';
import FormContext from '@components/Form/Context';
import { Input } from '@components/Inputs';
import FormPolygons from '@components/SVG/FormPolygons';
import AddStepFormButton from '@containers/AddStepFormButton';
import StepList from '@containers/StepList';
import FormError from '@containers/FormError';
import ProcedureSubmitButton from '@containers/SubmitButton';
import SubmitButton from '@components/SubmitButton';
import ModalTrigger from '@containers/ModalTrigger';
import { procedureSchema } from '@utils/validation';
import styles from './index.module.css';


export default (props) => (
  <FormContext
    {...props}
    initialValues={{...props.initialValues, version: props.initialValues.version ? props.initialValues.version + 1 : 0}}
    entity="procedure"
    validationSchema={procedureSchema}
    className={styles.content}
  >
    {({handleSubmit, formKey}) => (<>
      <div>
        <div className={styles.margin}>
          <Input as="input" name="name" type="text" label="Procedure Name" formKey={formKey} />
          <Input as="textarea" label="Description" name="description" rows="6" formKey={formKey} />
          {/*<Input as="input" name="author" type="text" label="Author" formKey={formKey} />*/}
          <Input as="input" name="language" type="text" label="Language" formKey={formKey} />
          <Input as="input" name="version" type="text" label="Version" disabled formKey={formKey} />
        </div>
        <AddStepFormButton formKey={formKey} />
        <div>
        <ModalTrigger modal="manage_devices" className={styles.manageDeviceButton}><SubmitButton label="Manage Device Labels" /></ModalTrigger>
        { props.oem_id ? <ModalTrigger modal="add_oem_business" className={styles.manageDeviceButton}><SubmitButton label="Add Site" /></ModalTrigger> : null }

        </div>
        <FormPolygons />
      </div>
      <div>
        <div className={styles.columnTitle}>Procedure Steps</div>
        <StepList procedure_id={props.procedure_id} formKey={formKey} initialStepIds={props.initialValues.steps} />
        <ProcedureSubmitButton formKey={formKey} onClick={handleSubmit} label="Save Procedure" className={styles.submit} />
        <FormError formKey={formKey} large className={styles.error} />
      </div>
    </>)}
  </FormContext>
)
