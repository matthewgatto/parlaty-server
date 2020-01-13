import React from 'react';
import { useSelector } from 'react-redux';
import Error from '../components/Error';

export default ({formKey, name}) => {
  const error = useSelector(({form}) => form[formKey] && form[formKey].errors && form[formKey].errors.fieldErrors ? form[formKey].errors.fieldErrors[name] : undefined)
  return <Error error={error} />
}
