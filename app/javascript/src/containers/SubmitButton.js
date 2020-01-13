import React from 'react';
import { useSelector } from 'react-redux';
import SubmitButton from '../components/SubmitButton';

export default ({formKey, ...props}) => {
  const isProcessing = useSelector(({form}) => form[formKey] ? form[formKey].isProcessing : false)
  return <SubmitButton isProcessing={isProcessing} {...props} />
}
