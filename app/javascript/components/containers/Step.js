import React,{useCallback,useEffect} from 'react';
import { useFormContext } from "react-hook-form";
import { useSelector,useDispatch } from 'react-redux';
import {mountForm,unmountForm} from '@actions/form';
import {closeStepForm,removeStepForm} from '@actions/step';
import {getStepFormData} from '@selectors/step';
import Step from '@components/Step/Form';

export default ({formKey,...props}) => {
  const { getValues, setValue } = useFormContext(),
        stepMeta = useSelector(getStepFormData(props.id, props.idx)),
        dispatch = useDispatch(),
        root = `steps[${props.formId}].`,
        stepFormKey = `step,${props.formId}`,
        initialValues = stepMeta.storeValues || stepMeta.formValues || {}/*stepMeta.isDuplicate ? stepMeta.formValues : (stepMeta.storeValues || {})*/
  var title;
  if(stepMeta.isDuplicate && (!stepMeta.formValues || !stepMeta.formValues.title)){
    title = "New Step"
  } else if(stepMeta.storeValues && stepMeta.storeValues.title){
    title = `Step ${props.idx+1}: ${stepMeta.storeValues.title}`
  } else {
    title = `Step ${props.idx+1}: ${getValues()[`${root}title`]}`
  }
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
  return <Step title={title} procedureFormKey={formKey} formKey={stepFormKey} root={root} isOpen={stepMeta.isOpen} initialValues={initialValues} isDuplicate={stepMeta.isDuplicate} /*timeOptions={TIME_OPTIONS}*/ handleCloseForm={handleCloseForm} {...props} />
}
