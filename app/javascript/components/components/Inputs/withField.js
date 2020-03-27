import React from 'react';
import Field from './Field';

export default (WrappedComponent) => ({name, label, formKey, labelClass, ...props}) => (
  <Field name={name} labelClass={labelClass} label={label} formKey={formKey}>
    <WrappedComponent {...props} name={name} />
  </Field>
)
