import React from 'react';
import { connect } from 'react-redux';
import StepMenu from '../components/StepMenu';
import { deleteStep, duplicateStep } from '../store/procedure';

class StepMenuContainer extends React.PureComponent {
  handleDelete = () => {
    this.props.deleteStep(this.props.idx)
  }
  handleDuplicate = () => {
    this.props.duplicateStep(this.props.idx)
  }
  render(){
    return(
      <StepMenu {...this.props} handleDelete={this.handleDelete} handleDuplicate={this.handleDuplicate} />
    )
  }
}

export default connect(
  null,
  { deleteStep, duplicateStep }
)(StepMenuContainer);
