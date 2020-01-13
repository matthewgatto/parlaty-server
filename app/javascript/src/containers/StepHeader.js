import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useFormContext } from "react-hook-form";
import { useSelector,useDispatch } from 'react-redux';
import {setStepForm,addStepForm,deleteStep,removeStepForm} from '../redux/actions/step';
import {isAStepFormOpen} from '../redux/selectors/step';
import useStepValues from './useStepValues';
import StepHeader from '../components/Step/Header';

export default ({idx, procedure_id, isDuplicate, id, title, isOpen, root}) => {
  const { getValues } = useFormContext()
  const isAFormOpen = useSelector(isAStepFormOpen);
  const dispatch = useDispatch();
  const handleClick = () => !isAFormOpen ? dispatch(setStepForm("remove args", {id, initialValues:{...useStepValues(getValues, root), number: idx+1}})) : undefined
  const duplicateStep = (e) => {
    e.stopPropagation();
    dispatch(addStepForm("remove args", useStepValues(getValues, root), true));
  }
  const handleDeleteStep = (e) => {
    e.stopPropagation();
    if(procedure_id){
      dispatch(deleteStep(id, idx, procedure_id));
    }
    dispatch(removeStepForm("remove args", idx))
  }
  return (
    <Draggable draggableId={id} index={idx} isDragDisabled={isAFormOpen}>
      {(provided, snapshot) => <StepHeader idx={idx} title={title} isOpen={isOpen} isAFormOpen={isAFormOpen} isDuplicate={isDuplicate} duplicateStep={duplicateStep} deleteStep={handleDeleteStep} setRef={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps} onClick={handleClick} />}
    </Draggable>
  )
}
