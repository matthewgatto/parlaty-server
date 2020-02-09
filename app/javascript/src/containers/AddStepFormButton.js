import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useFormContext } from "react-hook-form";
import {addStepForm} from '@actions/step';
import {getLastStepId} from '@selectors/step';
import AddFormButton from '@components/Form/Nested/AddFormButton';
import * as utils from '@utils';

export default () => {
  const { getValues } = useFormContext()
  const dispatch = useDispatch();
  const lastStepId = useSelector(getLastStepId)
  const handleClick = () => dispatch(addStepForm(lastStepId ? utils.makeStep(getValues(), `steps[${lastStepId}].`) : {mode: "continuous", time: 8, safety: true, device_id: 1, number: 1}, true));
  return <AddFormButton text="Add Step" onClick={handleClick} />
}
