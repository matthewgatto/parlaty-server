import React from 'react';
import Text from '../Text';
import InputField from '../InputField';
import TextareaField from '../TextareaField';
import styles from './index.module.css';

const ProcedureForm = () =>
  <div className={styles.container}>
    <InputField color="primary" label="Procedure Name" name="title" form="procedure" />
    <TextareaField color="primary" label="Description" rows="8" name="description" form="procedure" />
  </div>

export default ProcedureForm;
