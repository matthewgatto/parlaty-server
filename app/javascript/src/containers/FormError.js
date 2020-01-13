import React from 'react';
import { useSelector } from 'react-redux';
import Error from '../components/Error';

export default ({formKey,...props}) => {
  const error = useSelector(({form}) => form[formKey] && form[formKey].errors && form[formKey].errors.formError ? form[formKey].errors.formError : null)
  return <Error error={error} {...props} />
}
