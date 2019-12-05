import React from 'react';
import { connect } from 'react-redux';
import ProcedureForm from '../components/Forms/Procedure';
import FetchLoader from '../components/FetchLoader';
import FetchError from '../components/FetchError';
import { fetchEntity, handleEntityUpdateSubmit, clearForm, setImages } from '../redux/actions';

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
    const visuals = []
    for (var i = 0; i < this.props.procedure.steps.length; i++) {
      if(this.props.procedure.steps[i].image){
        visuals.push({id: this.props.procedure.steps[i].id, src: this.props.procedure.steps[i].image})
      }
    }
    if(visuals.length > 0) this.props.setImages(visuals)
  }
  makeEntityRequest = () => {
    this.props.fetchEntity(`/procedures/${this.props.id}`, 'procedures', this.props.id)
  }
  handleSubmit = values => {
    this.props.handleEntityUpdateSubmit(`/procedures/${this.props.id}`, 'procedures', this.props.id, values, this.props.to)
  }
  componentWillUnmount(){
    this.props.clearForm()
  }
  render(){
    if(this.props.error) return <FetchError error={this.props.error} retry={this.makeEntityRequest} />
    if(this.props.isLoading) return <FetchLoader text="PROCEDURE" />
    return (
      <ProcedureForm
        initialValues={this.props.procedure}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

export default connect(
  ({entities, meta}, {id}) => {
    const procedure = entities.procedures[id],
          procedureState = meta.procedures[id];
    return({
      shouldLoad: (!procedure.description && (!procedureState || !procedureState.isFetching)),
      error: (procedureState && procedureState.fetchError) ? procedureState.fetchError : undefined,
      isLoading: procedureState && procedureState.isFetching,
      procedure
    })
  },
  {handleEntityUpdateSubmit, fetchEntity, clearForm, setImages}
)(EditProcedureForm);
