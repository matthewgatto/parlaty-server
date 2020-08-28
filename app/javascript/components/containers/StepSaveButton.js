import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import StepSaveButton from '@components/Step/SaveButton';
import {STEP_SAVE_REQUEST} from '@types/step';
import {isFormProcessing} from '@selectors/form';
import { getStepValues } from '@selectors/step'

export default ({root, formKey, procedure_id, id, idx}) => {
  const dispatch = useDispatch();
  const isProcessing = useSelector(isFormProcessing(formKey));
  const values = useSelector(getStepValues(idx));
  const handleSubmit = () => dispatch({type: STEP_SAVE_REQUEST, payload: {formKey, procedure_id, id, idx, values: values}});
  return <StepSaveButton isProcessing={isProcessing} onClick={handleSubmit} />
}
