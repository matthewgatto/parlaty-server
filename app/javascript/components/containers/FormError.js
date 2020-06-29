import React from 'react';
import { useSelector } from 'react-redux';
import Error from '@components/Error';
import {getFormError} from '@selectors/form'

export default ({formKey,...props}) => {
  const error = useSelector(getFormError(formKey))
  return <Error error={error} {...props} />
}
