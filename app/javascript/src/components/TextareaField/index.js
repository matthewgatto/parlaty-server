import React from 'react';
import Field from '../../containers/Field';
import Textarea from '../../containers/Textarea';

const TextareaField = ({name, form, label, color, ...rest}) =>
  <Field name={name} form={form} label={label} color={color}>
    <Textarea name={name} form={form} {...rest} />
  </Field>

export default TextareaField;
