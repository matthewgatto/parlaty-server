import React from 'react';
import { useFormContext } from "react-hook-form";
import { useDispatch } from 'react-redux';
import StepCancelButton from '@components/Step/CancelButton';
import {closeStepForm,removeStepForm} from '@actions/step';

export default ({initialValues, isDuplicate, root, idx}) => {
  const { setValue } = useFormContext()
  const dispatch = useDispatch();
  const handleCancelButtonClick = () => {
    if(!isDuplicate){
      dispatch(closeStepForm(idx))
      for (var field in initialValues) {
        if (initialValues.hasOwnProperty(field)) {
          setValue(`${root}${field}`, initialValues[field])
        }
      }
    } else {
      dispatch(removeStepForm(idx))
    }
  }
  return <StepCancelButton onClick={handleCancelButtonClick} />
}
