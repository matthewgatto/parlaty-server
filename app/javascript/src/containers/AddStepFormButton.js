import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useFormContext } from "react-hook-form";
import {addStepForm} from '@actions/step';
import {getLastStepFormId} from '@selectors/step';
import AddFormButton from '@components/Form/Nested/AddFormButton';
import * as utils from '@utils';

export default () => {
  const { getValues } = useFormContext()
  const dispatch = useDispatch();
  const lastStepFormId = useSelector(getLastStepFormId)
  const handleClick = () => dispatch(addStepForm(lastStepFormId ? utils.makeStep(getValues(), `steps[${lastStepFormId}].`) : {mode: "continuous", time: 8, safety: true, number: 1}, true));
  return <AddFormButton text="Add Step" onClick={handleClick} />
}
