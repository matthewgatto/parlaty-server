import React from 'react';
import { connect } from 'react-redux';
import ProcedureForm from '../components/Forms/Procedure';
import { handleEntityCreateSubmit, clearForm } from '../redux/actions';

class NewProcedurePage extends React.PureComponent {
  handleSubmit = values => {
    this.props.handleEntityCreateSubmit('/procedures', 'procedures', values)
  }
  componentWillUnmount(){
    this.props.clearForm()
  }
  render(){
    return(
      <ProcedureForm
        initialValues={{oem_business_id: this.props.match.params.business_id, steps: [], author: this.props.userName}}
        header={`New Procedure For Business ${this.props.match.params.business_id}`}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

export default connect(
  ({user}) => ({userName: user.name}),
  {handleEntityCreateSubmit, clearForm}
)(NewProcedurePage);
