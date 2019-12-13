import React from 'react';
import { connect } from 'react-redux';
import { useFormikContext} from 'formik';
import StepSaveButton from '../components/StepSaveButton';
import { handleStepSubmit } from '../redux/actions';
import { stepSchema } from '../components/Forms/validation';

class StepSaveButtonContainer extends React.PureComponent {
  componentDidUpdate(prevProps){
    if(prevProps.isProcessing && this.props.isClosed && (this.props.step.number !== this.props.idx)){
      this.props.move(this.props.idx, this.props.step.number - 1);
    }
  }
  onClick = async () => {
    try {
      await stepSchema.validate(this.props.step, {abortEarly: false, stripUnknown: true})
      this.props.handleStepSubmit(this.props.step, this.props.idx)
    } catch (e) {
      if(e.inner && e.inner.length > 0){
        const errors = {};
        for (var i = 0; i < e.inner.length; i++) {
          errors[e.inner[i].path] = e.inner[i].message
        }
        const stepArray = new Array(this.props.idx+1);
        stepArray[this.props.idx] = errors;
        this.props.setErrors({steps: stepArray})
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
  ({form}, {step}) => (form.step && form.step.id === step.id) ? {isProcessing: form.step.isProcessing} : {isClosed: true},
  {handleStepSubmit}
)(StepSaveButtonContainer)

export default function({idx, move}){
  const {values: {steps}, setErrors} = useFormikContext();
  return <StepSaveButtonWrapper idx={idx} step={steps[idx]} setErrors={setErrors} move={move} />
}
