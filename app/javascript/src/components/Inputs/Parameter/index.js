import React from 'react';
import { Controller } from "react-hook-form";
import { useSelector } from 'react-redux';
import Error from '../../Error';
import {FieldWrapper} from '../Field';
import {LabelWrapper} from '../Label';
import {getParameterError} from '../../../redux/selectors/form';
import styles from './index.module.css';

const ParameterErrors = ({formKey}) => {
  const error = useSelector(getParameterError(formKey))
  return <Error error={error} />
}

export default ({root, formKey, initialName, initialValue}) => (
  <FieldWrapper className={styles.container}>
    <LabelWrapper>
      <div>Parameter*</div>
      <ParameterErrors formKey={formKey} />
    </LabelWrapper>
    <div className={`${styles.row} align_center`}>
      <div className={`${styles.nameFieldContainer} align_center`}>
      <div className={styles.label}>
        Name:
      </div>
      <div className={`${styles.nameFieldInputWrapper} align_center`}>
      <Controller name={`${root}parameter_name`} defaultValue={initialName} as="input" />
      </div>
      </div>
      <div className={`${styles.valueFieldContainer} align_center`}>
      <div className={styles.label}>
        Value:
      </div>
      <div className={`${styles.valueFieldInputWrapper} align_center`}>
      <Controller name={`${root}parameter_value_8_pack`} defaultValue={initialValue} as="input" />
      </div>
      </div>
    </div>
  </FieldWrapper>
)
