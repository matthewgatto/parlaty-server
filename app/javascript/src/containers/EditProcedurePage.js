import React from 'react';
import { connect } from 'react-redux';
import ProcedureForm from '../components/Forms/Procedure';
import FetchLoader from '../components/FetchLoader';
import FetchError from '../components/FetchError';

import { fetchEntity, handleEntityUpdateSubmit, clearForm } from '../redux/actions';

class EditProcedurePage extends React.PureComponent {
  componentDidMount(){
    if(!this.props.procedure || !this.props.procedure.description){
      this.makeEntityRequest();
    }
  }
  makeEntityRequest = () => {
    this.props.fetchEntity(`/procedures/${this.props.match.params.id}`, 'procedures', this.props.match.params.id)
  }
  handleSubmit = values => {
    this.props.handleEntityUpdateSubmit(`/procedures/${this.props.match.params.id}`, 'procedures', this.props.match.params.id, values)
  }
  componentWillUnmount(){
    this.props.clearForm()
  }
  render(){
    if(this.props.procedure && this.props.procedure.meta && this.props.procedure.meta.fetchError) return <FetchError error={this.props.procedure.meta.fetchError} retry={this.makeEntityRequest} />
    if(!this.props.procedure) return <FetchLoader />
    const { meta, ...procedure } = this.props.procedure;
    return (
      <ProcedureForm
        initialValues={procedure}
        handleSubmit={this.handleSubmit}
        header={`Edit Procedure ${this.props.match.params.id}`}
      />
    )
  }
}

export default connect(
  ({entities}, {match}) => ({procedure: entities.procedures[match.params.id]}),
  {handleEntityUpdateSubmit, fetchEntity, clearForm}
)(EditProcedurePage);
