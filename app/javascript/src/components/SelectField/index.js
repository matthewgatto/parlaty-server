import React from 'react';
import Field from '../../containers/Field';
import Select from '../../containers/Select';

const SelectField = ({name, form, label, color, options}) =>
  <Field name={name} form={form} label={label} color={color}>
    <Select name={name} form={form} options={options} />
  </Field>

export default SelectField;
