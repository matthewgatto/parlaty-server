import React,{useCallback} from 'react';
import { Draggable } from "react-beautiful-dnd";
import { useSelector,useDispatch } from 'react-redux';
import {reorderStep,closeStepForm} from '@actions/step';
import {getStepForms} from '@selectors/step';
import {getAllDevices} from '@selectors/device';
import withDND from '@components/withDND';
import Placeholder from '@components/Placeholder';
import Step from './Step';

const StepList = withDND(({steps, ...props}) => steps.map((step, idx) => (
  <Draggable key={step.formId} draggableId={step.formId} index={idx}>
    {(provided, snapshot) => <Step {...props} id={step.id} formId={step.formId} idx={idx} provided={provided} isDragging={snapshot.isDragging} />}
  </Draggable>
)))

const makePositionOptions = (stepCount) => {
  const options = [{value: 1, label: "Number 1"}]
  for (var i = 2; i < stepCount + 1; i++) {
    options.push({value: i, label: "Number "+i})
  }
  return options
}

export default (props) => {
  const devices = useSelector(getAllDevices);
  const steps = useSelector(getStepForms);
  const dispatch = useDispatch();
  const onDragEnd = (from, to) => dispatch(reorderStep(from, to, props.procedure_id))
  //CLOSE FORM BEFORE DRAG STARTS const onBeforeCapture = ({draggableId}) => dispatch(closeStepForm(draggableId))
  if(steps.length > 0){
    const positions = makePositionOptions(steps.length)
    return <StepList steps={steps} positions={positions} /*onBeforeCapture={onBeforeCapture}*/ onDragEnd={onDragEnd} {...props} devices={devices}  />
  }
  return <Placeholder text="This procedure currently has no steps" />
}
