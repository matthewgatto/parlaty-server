import React from 'react';
import Label from './Label';

export default (WrappedComponent) => ({label, formKey, labelClass, ...props}) => (
  <Label name={props.name} labelClass={labelClass} label={label} formKey={formKey}>
    <WrappedComponent {...props} />
  </Label>
)
