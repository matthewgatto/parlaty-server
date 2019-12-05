import React from 'react';
import { connect } from 'react-redux';
import { useFormikContext} from 'formik';
import StepMenu from './StepMenu';
import ActionBar from '../components/ActionBar';
import { setStep, deleteStep } from '../redux/actions';

function StepLabel({idx, id, setStep, canOpen, arrayHelpers, deleteStep, ...props}){
  const {values: {steps}} = useFormikContext();
  const onClick = () => {
    if(canOpen) setStep({idx: idx, initialValues: steps[idx]})
  }
  const duplicateStep = (e) => {
    e.stopPropagation();
    const newStep = {...steps[idx], number: steps.length + 1, id: Date.now()}
    arrayHelpers.push(newStep);
    const {image, ...initialValues} = newStep;
    setStep({idx: steps.length, initialValues})
  }
  const handleDeleteStep = (e) => {
    deleteStep(id, idx);
    e.stopPropagation();
    arrayHelpers.remove(idx)
  }
  return(
    <ActionBar
      text={`Step ${idx + 1}`}
      rightIcon={
        <StepMenu idx={idx} deleteStep={handleDeleteStep} duplicateStep={duplicateStep} />
      }
      onClick={onClick}
      {...props}
    />
  )
}

export default connect(
  ({form}) => ({canOpen: form.step ? false : true}),
  {setStep, deleteStep }
)(StepLabel)
