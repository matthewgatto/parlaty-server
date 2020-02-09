import React,{useCallback,useEffect} from 'react';
import { useFormContext } from "react-hook-form";
import { useSelector,useDispatch } from 'react-redux';
import {mountForm,unmountForm} from '@actions/form';
import {closeStepForm,removeStepForm} from '@actions/step';
import {getStepFormData} from '@selectors/step';
import Step from '@components/Step/Form';

const TIME_OPTIONS = [{value: 1, label: "1 second"}, {value: 2, label: "2 seconds"}, {value: 3, label: "3 seconds"}, {value: 4, label: "4 seconds"}, {value: 5, label: "5 seconds"}, {value: 6, label: "6 seconds"}, {value: 7, label: "7 seconds"}, {value: 8, label: "8 seconds"}]
export default ({formKey,...props}) => {
  const { getValues, setValue } = useFormContext(),
        stepMeta = useSelector(getStepFormData(props.id, props.idx)),
        dispatch = useDispatch(),
        root = `steps[${props.id}].`,
        stepFormKey = `step,${props.id}`,
        initialValues = stepMeta.isDuplicate ? stepMeta.formValues : (stepMeta.storeValues || {})
  console.log("stepMeta", stepMeta);
  var title;
  if(stepMeta.isDuplicate && (!stepMeta.formValues || !stepMeta.formValues.title)){
    title = "New Step"
  } else if(stepMeta.storeValues && stepMeta.storeValues.title){
    title = `Step ${props.idx+1}: ${stepMeta.storeValues.title}`
  } else {
    title = `Step ${props.idx+1}: ${getValues()[`${root}title`]}`
  }
  console.log("title", title);
  const handleCloseForm = () => {
    if(!stepMeta.isDuplicate){
      dispatch(closeStepForm(props.idx))
      for (var field in initialValues) {
        if (initialValues.hasOwnProperty(field)) {
          setValue(`${root}${field}`, initialValues[field])
        }
      }
    } else {
      dispatch(removeStepForm(props.idx))
    }
  }
  useEffect(() => {
    dispatch(mountForm(stepFormKey));
    return () => dispatch(unmountForm(stepFormKey));
  }, [])
  useEffect(() => {
    setValue(`${root}number`, props.idx+1)
  },[props.idx])
  return <Step title={title} procedureFormKey={formKey} formKey={stepFormKey} root={root} isOpen={stepMeta.isOpen} initialValues={initialValues} isDuplicate={stepMeta.isDuplicate} timeOptions={TIME_OPTIONS} handleCloseForm={handleCloseForm} {...props} />
}
