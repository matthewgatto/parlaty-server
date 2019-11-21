import React from 'react';
import { connect } from 'react-redux';
import StepCloseButton from '../components/StepCloseButton';
import { useFormikContext} from 'formik';
import { setStep } from '../redux/actions';

function StepCloseButtonContainer(props){
  const {errors: {steps,...nonStepErrors}, setFieldValue, setErrors} = useFormikContext();

  const onClick = () => {
    props.setStep(null);
    if(props.step.initialValues){
      setFieldValue(`steps[${props.step.idx}]`, props.step.initialValues)
      setErrors(nonStepErrors)
    } else {
      props.remove(props.step.idx)
    }

  }
  return <StepCloseButton onClick={onClick} />
}

export default connect(
  ({form}) => ({step: form.step}),
  {setStep}
)(StepCloseButtonContainer)
