import React from 'react';
import { connect } from 'react-redux';
import ProcedureForm from '../components/Forms/Procedure';
import { handleEntityCreateSubmit, clearForm, setCreateMeta, reorderStep } from '../redux/actions';

class CreateProcedureForm extends React.PureComponent {
  initialValues = {id: new Date().getTime(), oem_business_id: this.props.oem_business_id, steps: [], author: this.props.userName}
  componentDidMount(){
    this.props.setCreateMeta(this.initialValues)
  }
  handleSubmit = values => {
    this.props.handleEntityCreateSubmit('/procedures', 'procedures', values, this.initialValues.id, this.props.to)
  }
  componentWillUnmount(){
    this.props.clearForm()
  }
  render(){
    return(
      <ProcedureForm
        initialValues={this.initialValues}
        handleSubmit={this.handleSubmit}
        reorderStep={this.props.reorderStep}
      />
    )
  }
}

export default connect(
  null,
  {handleEntityCreateSubmit, clearForm, setCreateMeta, reorderStep}
)(CreateProcedureForm);
