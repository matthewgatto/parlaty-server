import React from 'react';
import LargeBar from '@components/Bar/Large';
import FormContext from '@components/Form/Context';
import SubmitButton from '@containers/SubmitButton';
import ProcedureCategories from '@containers/ProcedureCategories';
import {procedureCategoriesSchema} from '@utils/validation';
import styles from './index.module.css';


export default ({procedure_id,oem_id}) => (
  <div className={styles.container}>
    <LargeBar title="Update Categories" className={styles.modalHeader} />
    <FormContext
      url={`/procedures/${procedure_id}`}
      type="UPDATE_PROCEDURE_CATEGORIES_REQUEST"
      entity="procedure_categories"
      validationSchema={procedureCategoriesSchema}
      id={procedure_id}
    >
    {({handleSubmit, formKey}) => (<>
      <ProcedureCategories procedure_id={procedure_id} oem_id={oem_id} />
      <SubmitButton formKey={formKey} onClick={handleSubmit} label="Update Categories" />
    </>)}
    </FormContext>
  </div>
)
