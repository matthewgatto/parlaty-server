import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useFormContext } from "react-hook-form";
import { useSelector,useDispatch } from 'react-redux';
import {setStepFormMeta,addStepForm,deleteStep,removeStepForm} from '@actions/step';
import StepHeader from '@components/Step/Header';
import {makeStep} from '@utils';

export default ({idx, procedure_id, isDuplicate, id, title, isOpen, root, handleCloseForm}) => {
  const { getValues } = useFormContext()
  const isAFormOpen = useSelector(isAStepFormOpen);
  const dispatch = useDispatch();
  const handleClick = () => {
    if(isOpen){
      handleCloseForm()
    } else {
      dispatch(setStepFormMeta(idx, {initialValues:{...makeStep(getValues(), root), number: idx+1}}))
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
  return (
    <Draggable draggableId={id} index={idx}>
      {(provided, snapshot) => <StepHeader idx={idx} title={title} isOpen={isOpen} isDuplicate={isDuplicate} duplicateStep={duplicateStep} deleteStep={handleDeleteStep} setRef={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps} onClick={handleClick} isDragging={snapshot.isDragging} />}
    </Draggable>
  )
}
