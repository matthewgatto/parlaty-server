import React from 'react';
import { useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import StepSaveButton from '../components/Step/SaveButton';
import useStepValues from './useStepValues';
import {STEP_SAVE_REQUEST,STEP_SAVE_REQUEST__FAILURE} from '../redux/types/step';
import { stepSchema } from '../utils/validation';

export default ({root, formKey, procedure_id, id}) => {
  const { getValues } = useFormContext()
  const isProcessing = useSelector(({form}) => form[formKey] && form[formKey].isProcessing)
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    try {
      const step = useStepValues(getValues, root)
      console.log("STEP", step);
      await stepSchema.validate(step, {abortEarly: false, stripUnknown: true})
      dispatch({type: STEP_SAVE_REQUEST, payload: {formKey, procedure_id, id, formKey: `step,${id}`, step}})
    } catch (e) {
      console.log("e",e);
      if(e.inner && e.inner.length > 0){
        const fieldErrors = {};
        for (var i = 0; i < e.inner.length; i++) {
          fieldErrors[e.inner[i].path] = e.inner[i].message
        }
        dispatch({type: STEP_SAVE_REQUEST__FAILURE, payload: {formKey, errors:{fieldErrors}}})
      }
    }
  }
  return <StepSaveButton isProcessing={isProcessing} onClick={handleSubmit} />
}
