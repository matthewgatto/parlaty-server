import React from 'react';
import InputError from '../../containers/InputError';

export default ({ label, formKey, name}) => (
  <div className="field__label">
    {label && <div>{label}</div>}
    {formKey && <InputError formKey={formKey} name={name} />}
  </div>
)
