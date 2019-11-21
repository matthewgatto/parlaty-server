import React from 'react';
import { connect } from 'react-redux';
import { useFormikContext} from 'formik';
import StepSaveButton from '../components/StepSaveButton';
import { setStep, setImage } from '../redux/actions';

function StepSaveButtonContainer({idx, setStep, setImage, move, step, addImage}){
  const {values: {steps}, validateForm} = useFormikContext();
  const onClick = async () => {
    let errors = await validateForm({steps, name: 'valid_string', description: 'valid_string'});
    if(!errors.steps || !errors.steps[idx] || Object.keys(errors.steps[idx]).length === 0){
      setStep(null)
      const newStep = steps[idx]
      var newIdx = newStep.number - 1;

      if(idx != newIdx){
        move(idx, newIdx)
      }
      if(newStep.image && (!step.initialValues || newStep.image != step.initialValues.image)){
        var reader = new FileReader();
        reader.onload = (e) => {
          setImage({id: newStep.id, number: newStep.number, src: e.target.result})
        }
        reader.readAsDataURL(newStep.image)
      }
    }
  }
  return (
    <StepSaveButton onClick={onClick} />
  )
}

export default connect(
  ({form}) => ({step: form.step}),
  {setStep, setImage}
)(StepSaveButtonContainer)
