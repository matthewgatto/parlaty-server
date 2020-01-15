import React,{useCallback,useEffect} from 'react';
import { useFormContext } from "react-hook-form";
import { useSelector,useDispatch } from 'react-redux';
import {mountForm,unmountForm} from '../redux/actions/form';
import {getStepFormData} from '../redux/selectors/step';
import Step from '../components/Step/Form';

const TIME_OPTIONS = [{value: 1, label: "1 second"}, {value: 2, label: "2 seconds"}, {value: 3, label: "3 seconds"}, {value: 4, label: "4 seconds"}, {value: 5, label: "5 seconds"}, {value: 6, label: "6 seconds"}, {value: 7, label: "7 seconds"}, {value: 8, label: "8 seconds"}]
export default ({formKey,...props}) => {
  const { getValues } = useFormContext()
  const {initialValue, isOpen} = useSelector(getStepFormData(props.id));
  const root = `steps[${props.id}].`
  const stepFormKey = `step,${props.id}`
  const isDuplicate = isOpen && isOpen.isDuplicate;
  var title;
  if(isDuplicate && (!isOpen.initialValues || !isOpen.initialValues.title)){
    title = "New Step"
  } else if(initialValue && initialValue.title){
    title = `Step ${props.idx+1}: ${initialValue.title}`
  } else {
    title = `Step ${props.idx+1}: ${getValues()[`${root}title`]}`
  }
  const initialValues = isDuplicate ? isOpen.initialValues : (initialValue || {});
  const dispatch = useDispatch();
  useEffect(() => {
    if(isOpen){
      dispatch(mountForm(stepFormKey, isOpen.initialValues));
    } else {
      dispatch(unmountForm(stepFormKey));
    }
    return () => {
      if(isOpen){
        dispatch(unmountForm(`step,${props.id}`));
      }
    }
  }, [isOpen])
  return <Step title={title} procedureFormKey={formKey} formKey={stepFormKey} root={root} isOpen={isOpen} initialValues={initialValues} isDuplicate={isDuplicate} timeOptions={TIME_OPTIONS}  {...props} />
}
