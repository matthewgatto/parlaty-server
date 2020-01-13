import React from 'react';
import Form from '../../Form';
import { Input, Textarea } from '../../Inputs';
import AddStepButton from '../../../containers/AddStepButton';
import PolygonGroup from '../../SVG/PolygonGroup';
import StepList from '../../../containers/StepList';
import ImageList from '../../../containers/ImageList';
import FormError from '../../../containers/FormError';
import SubmitButton from '../../../containers/SubmitButton';
import { procedureSchema } from '../../../utils/validation';
import styles from './index.module.css';

export default (props) => (
  <Form
    {...props}
    entity="procedure"
    validationSchema={procedureSchema}
    wrapperId="procedure_form"
    className={styles.content}
  >
    {({handleSubmit, formKey}) => (<>
      <div>
        <div className={styles.margin}>
          <Input name="name" type="text" label="Procedure Name" required formKey={formKey} />
          <Textarea label="Description" name="description" required formKey={formKey} />
        </div>
        <AddStepButton formKey={formKey} />
        <PolygonGroup className={styles.polygonContainer} />
      </div>
      <div>
        <div className={styles.columnTitle}>Procedure Steps</div>
        <StepList procedure_id={props.procedure_id} formKey={formKey} initialStepIds={props.initialValues.steps} />
      </div>
      <div>
        <div className={styles.columnTitle}>Uploaded Imagery</div>
        <ImageList />
        <SubmitButton formKey={formKey} onClick={handleSubmit} label="Submit" className={styles.submit} />
        <FormError formKey={formKey} large className={styles.error} />
      </div>
    </>)}
  </Form>
)
