import React from 'react';
import Field from './Field';

export default (WrappedComponent) => ({name, label, formKey, labelClass, hidden, ...props}) => (
  <Field name={name} labelClass={labelClass} label={label} formKey={formKey} hidden={hidden}>
    <WrappedComponent {...props} name={name} />
  </Field>
)
