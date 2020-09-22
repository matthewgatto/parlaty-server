import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {addStepForm} from '@actions/step';
import {getLastTemplate} from '@selectors/template';
import AddFormButton from '@components/Form/Nested/AddFormButton';

export default () => {
  const dispatch = useDispatch();
  const lastStepForm = useSelector(getLastTemplate)
  const handleClick = () => {
    const formValues = {mode: "continuous", time: 0};
    const newStepForm = lastStepForm.spoken ? {...formValues, title: lastStepForm.title, spoken: lastStepForm.spoken} : formValues;
    dispatch( addStepForm(newStepForm, true));
  }
  return <AddFormButton text="Add Step" onClick={handleClick} />
}
