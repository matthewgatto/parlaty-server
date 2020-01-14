import React from 'react';
import Label from './Label';
import InputError from '../../containers/InputError';

export default ({children, label, labelClass, formKey, name}) => (
  <label className={labelClass ? `field ${labelClass}` : "field"}>
    <Label label={label} formKey={formKey} name={name} />
    {children}
  </label>
)
