import React from 'react';
import { useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import StepSaveButton from '@components/Step/SaveButton';
import {STEP_SAVE_REQUEST} from '@types/step';
import {isFormProcessing} from '@selectors/form';

export default ({root, formKey, procedure_id, id}) => {
  const { getValues } = useFormContext()
  const isProcessing = useSelector(isFormProcessing(formKey))
  const dispatch = useDispatch();
  const handleSubmit = () => dispatch({type: STEP_SAVE_REQUEST, payload: {formKey, procedure_id, id, root, values: getValues()}})
  return <StepSaveButton isProcessing={isProcessing} onClick={handleSubmit} />
}
