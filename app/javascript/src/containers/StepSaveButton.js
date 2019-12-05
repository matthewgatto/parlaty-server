import React from 'react';
import { connect } from 'react-redux';
import { useFormikContext} from 'formik';
import StepSaveButton from '../components/StepSaveButton';
import { setStep, setImage, removeImage } from '../redux/actions';

function StepSaveButtonContainer({idx, setStep, setImage, move, step, addImage, removeImage}){
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
      if((newStep.image && (!step.initialValues || !step.initialValues.image)) || !newStep.image != step.initialValues.image){
        if(newStep.image){
          if(typeof newStep.image === "string"){
            setImage({id: newStep.id, number: newStep.number, src: newStep.image})
          } else {
            var reader = new FileReader();
            reader.onload = (e) => {
              setImage({id: newStep.id, number: newStep.number, src: e.target.result})
            }
            reader.readAsDataURL(newStep.image)
          }

        } else {
          removeImage(newStep.id)
        }
      }
    }
  }
  return (
    <StepSaveButton onClick={onClick} />
  )
}

export default connect(
  ({form}) => ({step: form.step}),
  {setStep, setImage, removeImage}
)(StepSaveButtonContainer)
