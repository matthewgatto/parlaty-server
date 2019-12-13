import React from 'react';
import { connect } from 'react-redux';
import ProcedureForm from '../components/Forms/Procedure';
import FetchLoader from '../components/FetchLoader';
import FetchError from '../components/FetchError';
import { fetchEntity, handleEntityUpdateSubmit, clearForm, setImages, reorderStep, setStep } from '../redux/actions';

class EditProcedureForm extends React.PureComponent {
  componentDidMount(){
    if(this.props.shouldLoad){
      this.makeEntityRequest();
    }
    if(this.props.procedure && this.props.procedure.steps){
      this.addVisuals();
    }
  }
  componentDidUpdate(prevProps){
    if((!prevProps.procedure || !prevProps.procedure.steps) && this.props.procedure && this.props.procedure.steps){
      this.addVisuals();
    }
  }
  addVisuals = () => {
    const steps = this.props.procedure.steps,
          visuals = [];
    var count = 0;
    for (var i = 0; i < steps.length; i++) {
      const step = steps[i];
      if(step.image){
        count++;
        const img = new Image();
        const idx = i;
        img.src = step.image;
        img.onload = () => {
          visuals.push({id: step.id, idx, src: step.image})
          if(--count <= 0){
            this.props.setImages(visuals.sort((a,b) => (a.idx - b.idx)))
          }
        }
      }
    }
  }
  makeEntityRequest = () => {
    this.props.fetchEntity(`/procedures/${this.props.id}`, 'procedures', this.props.id)
  }
  handleSubmit = ({steps, ...procedure}) => {
    this.props.handleEntityUpdateSubmit(`/procedures/${this.props.id}`, 'procedures', this.props.id, procedure, this.props.to)
  }
  componentWillUnmount(){
    this.props.clearForm()
  }
  render(){
    if(this.props.error) return <FetchError error={this.props.error} retry={this.makeEntityRequest} />
    if(this.props.shouldLoad || this.props.isLoading) return <FetchLoader text="PROCEDURE" />
    return (
      <ProcedureForm
        initialValues={this.props.procedure}
        handleSubmit={this.handleSubmit}
        procedure_id={this.props.id}
        reorderStep={this.props.reorderStep}
        setStep={this.props.setStep}
      />
    )
  }
}

export default connect(
  ({entities, meta}, {id}) => {
    const procedure = entities.procedures[id],
          procedureState = meta.procedures[id];
    if(procedureState && procedureState.fetchError) return {error: procedureState.fetchError}
    if(procedureState && procedureState.isFetching) return {isLoading: true}
    if(!procedure.description && (!procedureState || !procedureState.isFetching)) return {shouldLoad: true}
    if(procedure.steps){
      return {
        procedure: {
          ...procedure,
          steps: procedure.steps.map(stepId => entities.steps[stepId])
        }
      }
    }
    return {
      procedure
    }
  },
  {handleEntityUpdateSubmit, fetchEntity, clearForm, setImages, reorderStep, setStep}
)(EditProcedureForm);
