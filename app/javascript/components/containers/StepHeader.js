import React from "react";
import { useFormContext } from "react-hook-form";
import {useDispatch, useSelector} from 'react-redux';
import {openStepForm,addStepForm,deleteStep,removeStepForm} from '@actions/step';
import {getStepValues} from '@selectors/template';
import StepHeader from '@components/Step/Header';
import {makeStep} from '@utils';

export default ({idx, procedure_id, isDuplicate, id, title, looped, isOpen, root, handleCloseForm, hasNewComments, comments, isDragging}) => {
  const { getValues } = useFormContext();
  const dispatch = useDispatch();
  const handleClick = () => {
    if(isOpen){
      handleCloseForm()
    } else {
      dispatch(openStepForm(idx, {...makeStep(getValues(), root)}))
    }
  };
  const stepForm = useSelector(getStepValues(idx));
  const device_id = stepForm && stepForm.device_id;
  const duplicateStep = (e) => {
    e.stopPropagation();
    dispatch(addStepForm(stepForm, true));
  };
  const handleDeleteStep = (e) => {
    e.stopPropagation();
    if(procedure_id){
      dispatch(deleteStep(id, idx, procedure_id));
    }
    dispatch(removeStepForm(idx))
  };
  return (<StepHeader id={id} root={root} idx={idx} title={title} hasNewComments={hasNewComments} procedureId={procedure_id} comments={comments} looped={looped} isOpen={isOpen} isDuplicate={isDuplicate} deviceId={device_id} duplicateStep={duplicateStep} deleteStep={handleDeleteStep} onClick={handleClick} isDragging={isDragging} />)
}
