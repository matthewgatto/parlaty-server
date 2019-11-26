import React from 'react';
import { connect } from 'react-redux';
import ProcedureForm from '../components/Forms/Procedure';
import FetchLoader from '../components/FetchLoader';
import FetchError from '../components/FetchError';

import { fetchEntity, handleEntityUpdateSubmit, clearForm } from '../redux/actions';

class EditProcedurePage extends React.PureComponent {
  componentDidMount(){
    if(!this.props.sholdLoad){
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
    if(this.props.error) return <FetchError error={this.props.error} retry={this.makeEntityRequest} />
    if(this.props.isLoading) return <FetchLoader />
    return (
      <ProcedureForm
        initialValues={this.props.procedure}
        handleSubmit={this.handleSubmit}
        header={`Edit Procedure ${this.props.match.params.id}`}
      />
    )
  }
}

export default connect(
  ({entities, meta}, {match: {params: {id}}}) => {
    const procedure = entities.procedures[id],
          procedureState = meta.procedures[id];
    return({
      shouldLoad: !procedureState || !procedureState.isFetching,
      error: (procedureState && procedureState.fetchError) ? procedureState.fetchError : undefined,
      isLoading: procedureState && procedureState.isFetching/**ONCE OEM DATA IMPLEMENTED?** (!initialValues || (oemState && oemState.isFetching))*/,
      procedure
    })
  },
  {handleEntityUpdateSubmit, fetchEntity, clearForm}
)(EditProcedurePage);
