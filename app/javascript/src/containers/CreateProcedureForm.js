import React from 'react';
import { connect } from 'react-redux';
import ProcedureForm from '../components/Forms/Procedure';
import { handleEntityCreateSubmit, clearForm } from '../redux/actions';

class CreateProcedureForm extends React.PureComponent {
  handleSubmit = values => {
    this.props.handleEntityCreateSubmit('/procedures', 'procedures', values, this.props.to)
  }
  componentWillUnmount(){
    this.props.clearForm()
  }
  render(){
    return(
      <ProcedureForm
        initialValues={{oem_business_id: this.props.oem_business_id, steps: [], author: this.props.userName}}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

export default connect(
  () => ({}),
  {handleEntityCreateSubmit, clearForm}
)(CreateProcedureForm);
