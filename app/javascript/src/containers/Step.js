import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import AnimateHeight from 'react-animate-height';
import { useFormikContext} from 'formik';
import StepFields from '../components/StepFields';
import StepMenu from './StepMenu';
import ActionBar from '../components/ActionBar';
import { setStep, deleteStep, deleteStepVisuals } from '../redux/actions';

function StepLabel({idx, setStep, id, canOpen, arrayHelpers, deleteStep, deleteStepVisuals, isEditing, isOpen, ...props}){
  const {values: {steps}} = useFormikContext();
  const step = steps[idx]
  const onClick = () => {
    if(canOpen) setStep({id: step.id, isEditing, initialValues: step})
  }
  const duplicateStep = (e) => {
    e.stopPropagation();
    const newStep = {...step, number: steps.length + 1, id: Date.now()}
    arrayHelpers.push(newStep);
    setStep({id: newStep.id, isCreating: isEditing, initialValues: {}})
  }
  const handleDeleteStep = (e) => {
    if(step.procedure_id){
      deleteStep(id, idx, step.procedure_id);
    }
    deleteStepVisuals(id, idx)
    e.stopPropagation();
    arrayHelpers.remove(idx)
  }
  return(
    <ActionBar
      text={`Step ${idx + 1}`}
      rightIcon={
        <StepMenu idx={idx} deleteStep={handleDeleteStep} duplicateStep={duplicateStep} isFormOpen={isOpen} />
      }
      onClick={onClick}
      {...props}
    />
  )
}

function Step(props){
  return(
    <>
      <StepLabel deleteStep={props.deleteStep} deleteStepVisuals={props.deleteStepVisuals} setStep={props.setStep} isOpen={props.isOpen} canOpen={props.canOpen} id={props.id} idx={props.idx} arrayHelpers={props.arrayHelpers} steps={props.steps} isEditing={props.isEditing} setRef={props.provided.innerRef} {...props.provided.dragHandleProps} {...props.provided.draggableProps} />
      <AnimateHeight height={props.isOpen ? 'auto' : 0} duration={200}>
        <StepFields isOpen={props.isOpen} idx={props.idx} id={props.id} arrayHelpers={props.arrayHelpers} steps={props.steps} />
      </AnimateHeight>
    </>
  )
}

export default connect(
  ({form: {step}}, {id}) => {
    return({
      canOpen: step ? false : true,
      isOpen: (step && step.id === id) ? true : false
    })
  },
  { setStep, deleteStep, deleteStepVisuals }
)(Step)
