import React, { useEffect } from 'react';
import { useFormContext } from "react-hook-form";
import { useSelector,useDispatch } from 'react-redux';
import {mountForm,unmountForm} from '@actions/form';
import {closeStepForm,removeStepForm} from '@actions/step';
import {getStepFormData} from '@selectors/step';
import Step from '@components/Step/Form';
import {updateTabValues} from "@actions/form";
import {Draggable} from "react-beautiful-dnd";

export default ({formKey,...props}) => {
  const { getValues, setValue } = useFormContext(),
        stepMeta = useSelector(getStepFormData(props.id, props.idx)),
        dispatch = useDispatch(),
        root = `steps[${props.formId}].`,
        stepFormKey = `step,${props.formId}`,
        initialValues = stepMeta.storeValues || stepMeta.formValues || {};/*stepMeta.isDuplicate ? stepMeta.formValues : (stepMeta.storeValues || {})*/
  let title;
  if(stepMeta.isDuplicate && (!stepMeta.formValues || !stepMeta.formValues.title)){
    title = "New Step"
  } else if(stepMeta.storeValues && stepMeta.storeValues.title){
    title = `Step ${props.idx+1}: ${stepMeta.storeValues.title}`
  } else {
    title = `Step ${props.idx+1}: ${getValues()[`${root}title`]}`
  }
  let looped_by = stepMeta.storeValues && stepMeta.storeValues.looped_by || -1;
  let isLooped = looped_by > -1;
  if(isLooped) title += ` (looped by Step ${looped_by})`
  let isDragDisabled = (isLooped || !stepMeta.id);
  const handleCloseForm = () => {
    if(!stepMeta.isDuplicate){
      dispatch(closeStepForm(props.idx));
      for (let field in initialValues) {
        if (initialValues.hasOwnProperty(field)) {
          setValue(`${root}${field}`, initialValues[field])
        }
      }
    } else {
      dispatch(removeStepForm(props.idx))
    }
  };
  useEffect(() => {
    dispatch(updateTabValues(props.idx, initialValues));
    dispatch(mountForm(stepFormKey));
    return () => dispatch(unmountForm(stepFormKey));
  }, []);
  return(
    <Draggable key={props.formId} draggableId={props.formId} index={props.idx} isDragDisabled={isDragDisabled}>
      {(provided, snapshot) => <Step provided={provided} isDragging={snapshot.isDragging} title={title} procedureFormKey={formKey} formKey={stepFormKey} root={root} isOpen={stepMeta.isOpen} initialValues={initialValues} isDuplicate={stepMeta.isDuplicate} /*timeOptions={TIME_OPTIONS}*/ handleCloseForm={handleCloseForm} {...props} />}
    </Draggable>
  )
}
