import React from 'react';
import Field from './Field';

export default (WrappedComponent) => ({label, formKey, labelClass, ...props}) => (
  <Field name={props.name} labelClass={labelClass} label={label} formKey={formKey}>
    <WrappedComponent {...props} />
  </Field>
)
