import React from 'react';
import { connect } from 'react-redux';
import ProcedureForm from '../components/Forms/Procedure';
import { fetchEntity, handleEntityUpdateSubmit, clearForm } from '../redux/actions';

class EditProcedurePage extends React.PureComponent {
  componentDidMount(){
    if(!this.props.procedure || !this.props.procedure.steps){
      this.props.fetchEntity(`/procedures/${this.props.match.params.id}`, 'procedures', this.props.match.params.id)
    }
  }
  handleSubmit = values => {
    this.props.handleEntityUpdateSubmit(`/procedures/${this.props.match.params.id}`, 'procedures', this.props.match.params.id, values)
  }
  componentWillUnmount(){
    this.props.clearForm()
  }
  render(){
    if(this.props.procedure && this.props.procedure.meta && this.props.procedure.meta.fetchError) return <div>{this.props.procedure.meta.fetchError}</div>
    if(!this.props.procedure) return <div>Loading</div>
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
