import React from 'react';
import LargeBar from '@components/Bar/Large';
import FormContext from '@components/Form/Context';
import SubmitButton from '@containers/SubmitButton';
import ProcedureOemBusinesses from '@containers/ProcedureOemBusinesses';
import {procedureOemBusinessesSchema} from '@utils/validation';
import { UPDATE_PROCEDURE_OEM_BUSINESSES_REQUEST } from '@types/procedure';
import styles from './index.module.css';


export default ({procedure_id,oem_id}) => (
  <div className={styles.container}>
    <LargeBar title="Update Sites" className={styles.modalHeader} />
    <FormContext
      url={`/procedures/${procedure_id}`}
      type={UPDATE_PROCEDURE_OEM_BUSINESSES_REQUEST}
      entity="procedure_oem_businesses"
      validationSchema={procedureOemBusinessesSchema}
      id={procedure_id}
    >
    {({handleSubmit, formKey}) => (<>
      <ProcedureOemBusinesses procedure_id={procedure_id} oem_id={oem_id} />
      <SubmitButton formKey={formKey} onClick={handleSubmit} label="Update Sites" />
    </>)}
    </FormContext>
  </div>
)
