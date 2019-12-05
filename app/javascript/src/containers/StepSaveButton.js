import React from 'react';
import { connect } from 'react-redux';
import { useFormikContext} from 'formik';
import StepSaveButton from '../components/StepSaveButton';
import { setStep, setImage, removeImage, createStep, handleEntityUpdateSubmit } from '../redux/actions';

class StepSaveButtonContainer extends React.PureComponent {
  componentDidUpdate(prevProps){
    if(prevProps.isProcessing && (!this.props.isProcessing && !this.props.error)){
      this.addStepToForm();
    }
  }
  addStepToForm = () => {
    const { steps, idx, initialValues, createStep, setStep, setImage, removeImage, move } = this.props;

    const newStep = steps[idx]
    var newIdx = newStep.number ? newStep.number - 1 : null;
    if(newIdx && idx != newIdx){
      move(idx, newIdx)
    }
    setStep(null)
    const initialImage = initialValues.image;
    const newImage = newStep.image
    if((initialImage || newImage) && newImage != initialImage){
      if(newImage){
        if(typeof newImage === "string"){

          setImage({id: newStep.id, number: newStep.number, src: newImage})

        } else {
          var reader = new FileReader();
          reader.onload = (e) => {
            setImage({id: newStep.id, number: newStep.number, src: e.target.result})
          }
          reader.readAsDataURL(newImage)
        }

      } else {
        removeImage(newStep.id)
      }
    }
  }
  onClick = async () => {
    const { validateForm, steps, idx, createStep, handleEntityUpdateSubmit } = this.props;
    const errors = await validateForm({steps, name: 'valid_string', description: 'valid_string'});
    if(!errors.steps || !errors.steps[idx] || Object.keys(errors.steps[idx]).length === 0){
      const newStep = steps[idx]
      if(newStep.shouldCreate){
        createStep(newStep);
      } else if(!newStep.shouldntUpdate){
        handleEntityUpdateSubmit(`/steps/${newStep.id}`, 'steps', newStep.id, newStep)
      } else {
        this.addStepToForm()
      }
    }
  }
  render(){
    return(
      <StepSaveButton onClick={this.onClick} isProcessing={this.props.isProcessing} />
    )
  }
}

const StepSaveButtonWrapper = connect(
  ({form, entities, meta}, {steps, idx}) => {
    const initialValues = (form.step && form.step.initialValues) ? form.step.initialValues : {}
    var id, isProcessing;
    if(initialValues.procedure_id){
      const procedure = entities.procedures[initialValues.procedure_id];
      isProcessing = meta.steps[procedure.steps[idx]] ? meta.steps[procedure.steps[idx]].isProcessing : false
    } else {
      isProcessing = meta.creating[steps[idx].id] ? meta.creating[steps[idx].id].isProcessing : false
    }
    return({initialValues, isProcessing })
  },
  {setStep, setImage, removeImage, createStep, handleEntityUpdateSubmit}
)(StepSaveButtonContainer)

export default function({idx}){
  const {values: {steps}, validateForm} = useFormikContext();
  return <StepSaveButtonWrapper idx={idx} steps={steps} validateForm={validateForm} />
}
