import React from 'react';
import { useSelector } from 'react-redux';
import SubmitButton from '../components/SubmitButton';
import {isFormProcessing} from '../redux/selectors/form';

export default ({formKey, ...props}) => {
  const isProcessing = useSelector(isFormProcessing(formKey))
  return <SubmitButton isProcessing={isProcessing} {...props} />
}
