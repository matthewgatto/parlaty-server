import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useFormContext } from "react-hook-form";
import {addStepForm} from '../redux/actions/step';
import {isAStepFormOpen,getLastStepId} from '../redux/selectors/step';
import useStepValues from './useStepValues';
import AddStepButton from '../components/AddStepButton';

export default ({formKey}) => {
  const { getValues } = useFormContext()
  const dispatch = useDispatch();
  const stepFormOpen = useSelector(isAStepFormOpen)
  const lastStepId = useSelector(getLastStepId)
  const handleClick = () => dispatch(addStepForm(formKey, lastStepId ? useStepValues(getValues, `steps[${lastStepId}].`) : {mode: "continuous", time: 8, skip: true, device: 1}, true));
  return <AddStepButton onClick={stepFormOpen ? undefined : handleClick} />
}
