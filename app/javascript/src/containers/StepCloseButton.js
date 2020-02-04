import React from 'react';
import { useFormContext } from "react-hook-form";
import { useDispatch } from 'react-redux';
import StepCloseButton from '@components/Step/CloseButton';
import {setStepForm,removeStepForm} from '@actions/step';

export default ({initialValues, isDuplicate, root, idx}) => {
  const { setValue } = useFormContext()
  const dispatch = useDispatch();
  const handleCloseButtonClick = () => {
    if(!isDuplicate){
      dispatch(setStepForm(null))
      for (var field in initialValues) {
        if (initialValues.hasOwnProperty(field)) {
          setValue(`${root}${field}`, initialValues[field])
        }
      }
    } else {
      dispatch(setStepForm(null))
      dispatch(removeStepForm(idx))
    }
  }
  return <StepCloseButton onClick={handleCloseButtonClick} />
}
