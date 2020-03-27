import React from 'react';
import InputError from '@containers/InputError';
import styles from './index.module.css';

export const LabelWrapper = ({className, children}) => (
  <div className={className ? `${styles.container} align_center ${className}` : `${styles.container} align_center`}>
    {children}
  </div>
)

export default ({ label, formKey, name, className}) => (
  <LabelWrapper className={className}>
    {label && <div>{label}</div>}
    {formKey && <InputError formKey={formKey} name={name} />}
  </LabelWrapper>
)
