import React from 'react';
import Label from '../Label';
import InputError from '@containers/InputError';
import styles from './index.module.css';

export const FieldWrapper = ({className, children}) => (
  <label className={className ? `${styles.container} ${className}` : styles.container}>
    {children}
  </label>
)

export default ({children, label, labelClass, formKey, name}) => (
  <FieldWrapper className={labelClass}>
    <Label label={label} formKey={formKey} name={name} />
    {children}
  </FieldWrapper>
)
