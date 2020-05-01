import React from 'react';
import Label from '../Label';
import InputError from '@containers/InputError';
import styles from './index.module.css';

export const FieldWrapper = ({className, children, hidden}) => {
  let classStr = styles.container
  if(className) classStr += " "+className
  if(hidden) classStr += " "+styles.hidden
  return(
    <label className={classStr}>
      {children}
    </label>
  )
}
export default ({children, label, labelClass, formKey, name, hidden}) => (
  <FieldWrapper className={labelClass} hidden={hidden}>
    <Label label={label} formKey={formKey} name={name} />
    {children}
  </FieldWrapper>
)
