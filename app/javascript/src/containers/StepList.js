import React,{useCallback} from 'react';
import { Draggable } from "react-beautiful-dnd";
import { useSelector,useDispatch } from 'react-redux';
import {reorderStep,closeStepForm} from '@actions/step';
import {getStepForms} from '@selectors/step';
import withDND from '@components/withDND';
import Placeholder from '@components/Placeholder';
import Step from './Step';

const StepList = withDND(({steps, ...props}) => steps.map((step, idx) => (
  <Draggable key={step.formId} draggableId={step.formId} index={idx}>
    {(provided, snapshot) => <Step {...props} id={step.id} formId={step.formId} idx={idx} provided={provided} isDragging={snapshot.isDragging} />}
  </Draggable>
)))

export default (props) => {
  const steps = useSelector(getStepForms);
  const dispatch = useDispatch();
  const onDragEnd = (from, to) => dispatch(reorderStep(from, to, props.procedure_id))
  //CLOSE FORM BEFORE DRAG STARTS const onBeforeCapture = ({draggableId}) => dispatch(closeStepForm(draggableId))
  if(steps.length > 0){
    return <StepList steps={steps} /*onBeforeCapture={onBeforeCapture}*/ onDragEnd={onDragEnd} {...props} />
  }
  return <Placeholder text="This procedure currently has no steps" />
}
