import React from 'react';
import { connect } from 'react-redux';
import { useFormikContext} from 'formik';
import StepMenu from './StepMenu';
import ActionBar from '../components/ActionBar';
import { setStep } from '../redux/actions';

function StepLabel({idx, setStep, canOpen, arrayHelpers, ...props}){
  const {values: {steps}} = useFormikContext();
  const onClick = () => {
    if(canOpen) setStep({idx: idx, initialValues: steps[idx]})
  }
  const duplicateStep = (e) => {
    e.stopPropagation();
    let newStep = {...steps[idx], number: steps.length + 1, id: Date.now()}
    arrayHelpers.push(newStep);
    setStep({idx: steps.length, initialValues: newStep})
  }
  const deleteStep = (e) => {
    e.stopPropagation();
    arrayHelpers.remove(idx)
  }
  return(
    <ActionBar
      text={`Step ${idx + 1}`}
      rightIcon={
        <StepMenu idx={idx} deleteStep={deleteStep} duplicateStep={duplicateStep} />
      }
      onClick={onClick}
      {...props}
    />
  )
}

export default connect(
  ({form}) => ({canOpen: form.step ? false : true}),
  {setStep}
)(StepLabel)
