import React from 'react';
import { connect } from 'react-redux';
import StepCloseButton from '../components/StepCloseButton';
import { useFormikContext} from 'formik';
import { setStep } from '../redux/actions';

function StepCloseButtonContainer(props){
  const {errors: {steps,...nonStepErrors}, setFieldValue, setErrors} = useFormikContext();

  const onClick = () => {
    const {initialValues} = props.step;
    props.setStep(null);
    if(initialValues && Object.keys(initialValues).length > 0){
      setFieldValue(`steps[${props.idx}]`, initialValues)
    } else {
      props.remove(props.idx)
    }
    setErrors(nonStepErrors)
  }
  return <StepCloseButton onClick={onClick} />
}

export default connect(
  ({form}) => ({step: form.step}),
  {setStep}
)(StepCloseButtonContainer)
