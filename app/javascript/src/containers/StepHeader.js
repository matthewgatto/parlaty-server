import React from "react";

import { useFormContext } from "react-hook-form";
import { useSelector,useDispatch } from 'react-redux';
import {openStepForm,addStepForm,deleteStep,removeStepForm} from '@actions/step';
import StepHeader from '@components/Step/Header';
import {makeStep} from '@utils';

export default ({idx, procedure_id, isDuplicate, id, title, isOpen, root, handleCloseForm, isDragging}) => {
  const { getValues } = useFormContext()
  const dispatch = useDispatch();
  const handleClick = () => {
    if(isOpen){
      handleCloseForm()
    } else {
      dispatch(openStepForm(idx, {...makeStep(getValues(), root), number: idx+1}))
    }
  }
  const duplicateStep = (e) => {
    e.stopPropagation();
    dispatch(addStepForm(makeStep(getValues(), root), true));
  }
  const handleDeleteStep = (e) => {
    e.stopPropagation();
    if(procedure_id){
      dispatch(deleteStep(id, idx, procedure_id));
    }
    dispatch(removeStepForm(idx))
  }
  return (<StepHeader idx={idx} title={title} isOpen={isOpen} isDuplicate={isDuplicate} duplicateStep={duplicateStep} deleteStep={handleDeleteStep} onClick={handleClick} isDragging={isDragging} />)
}
