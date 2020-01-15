import React from 'react';
import { useSelector } from 'react-redux';
import Error from '../components/Error';
import {getFormFieldError} from '../redux/selectors/form';

export default ({formKey, name}) => {
  const error = useSelector(getFormFieldError(formKey, name))
  return <Error error={error} />
}
