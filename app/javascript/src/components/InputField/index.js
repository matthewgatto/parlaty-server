import React from 'react';
import Field from '../../containers/Field';
import Input from '../../containers/Input';

const InputField = ({name, form, label, color}) =>
  <Field name={name} form={form} label={label} color={color}>
    <Input name={name} form={form} />
  </Field>

export default InputField;
