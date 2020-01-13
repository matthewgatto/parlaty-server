import React from 'react';
import InputError from '../../containers/InputError';

export default ({children, label, labelClass, formKey, name}) => (
  <label className={labelClass ? `field ${labelClass}` : "field"}>
    <div className="field__label">
      {label && <div>{label}</div>}
      {formKey && <InputError formKey={formKey} name={name} />}
    </div>
    {children}
  </label>
)
