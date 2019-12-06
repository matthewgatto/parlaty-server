import React from 'react';
import { connect } from 'react-redux';
import { useFormikContext} from 'formik';
import StepSaveButton from '../components/StepSaveButton';
import { setStep, setImage, removeImage, handleEntityCreateSubmit, handleEntityUpdateSubmit, setCreateMeta, reorderStep } from '../redux/actions';

function getUpdatedProperties(newObj = {}, initialObj = {}){
  const updates = {};
  for (var field in newObj) {
    if (newObj.hasOwnProperty(field) && newObj[field] !== initialObj[field]){
      updates[field] = newObj[field]
    }
  }
  return (Object.keys(updates).length > 0 || files.length > 0) ? updates : false;
}

class StepSaveButtonContainer extends React.PureComponent {
  componentDidMount(){
    const step = this.props.steps[this.props.idx]
    if(step.shouldCreate){
      this.props.setCreateMeta(step)
    }
  }
  componentDidUpdate(prevProps){
    if(prevProps.isProcessing && (!this.props.isProcessing && !this.props.error)){
      this.closeStep();
    }
  }
  closeStep = () => {
    this.props.setStep(null)
    this.reorderStep();
    this.addStepToForm();
  }
  createStep = (idx) => {
    const step = this.props.steps[this.props.idx];
    const prevIdx = idx - 1
    var previous_step_id;
    if(prevIdx < 0){
      previous_step_id = 0
    } else {
      previous_step_id = this.props.steps[prevIdx].id
    }
    this.props.handleEntityCreateSubmit('/steps', 'steps', {step, previous_step_id}, step.id);
  }
  addStepToForm = () => {
    const { steps, idx, initialValues, setImage, removeImage } = this.props;
    const newStep = steps[idx]
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
  reorderStep = () => {
    const { idx: a, steps, move, reorderStep } = this.props;
    const step = steps[a],
          b = step.number - 1;
    if(a != b){
      move(a, b);
      var stepOrder;
      if(a > b){
        stepOrder = [...steps.slice(0, b), steps[a], ...steps.slice(b, a), ...steps.slice(a+1)].map(step => step.id)
      } else {
        stepOrder = [...steps.slice(0, a), ...steps.slice(a+1, b+1), steps[a], ...steps.slice(b + 1)].map(step => step.id)
      }
      reorderStep(stepOrder, step.image ? true : false, !step.shouldCreate && !step.shouldntUpdate && step.procedure_id)
    }
  }
  onClick = async () => {
    const { validateForm, steps, idx, initialValues, handleEntityUpdateSubmit } = this.props;
    const errors = await validateForm({steps, name: 'valid_string', description: 'valid_string'});
    if(!errors.steps || !errors.steps[idx] || Object.keys(errors.steps[idx]).length === 0){
      const newStep = steps[idx]
      if(getUpdatedProperties(newStep, initialValues)){
        var newIdx = newStep.number != idx + 1 ? newStep.number - 1 : idx;
        if(newStep.shouldCreate){
          this.createStep(newIdx)
        } else if(!newStep.shouldntUpdate){
          handleEntityUpdateSubmit(`/steps/${newStep.id}`, 'steps', newStep.id, newStep)
        } else {
          this.closeStep()
        }
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
    const step = steps[idx];
    var initialValues = {};
    var isProcessing = false;
    if(step.shouldCreate){
      const createMeta = meta.creating[step.id]
      if(createMeta){
        initialValues = createMeta.initialValues ? createMeta.initialValues : {}
        isProcessing = createMeta.isProcessing
      }
    } else if(!step.shouldntUpdate) {
      const entity = entities.steps[step.id];
      const editMeta = meta.steps[step.id];
      if(entity){
        initialValues = entity;
      }
      if(editMeta){
        isProcessing = editMeta.isProcessing
      }
    }
    return({initialValues, isProcessing })
  },
  {setStep, setImage, removeImage, handleEntityCreateSubmit, handleEntityUpdateSubmit, setCreateMeta,reorderStep}
)(StepSaveButtonContainer)

export default function({idx, move}){
  const {values: {steps}, validateForm} = useFormikContext();
  return <StepSaveButtonWrapper idx={idx} steps={steps} validateForm={validateForm} move={move} />
}
