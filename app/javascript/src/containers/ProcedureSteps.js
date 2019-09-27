import React from 'react';
import { connect } from 'react-redux'
import ProcedureSteps from '../components/ProcedureSteps';
import { reorderStep } from '../store/procedure';

class ProcedureStepsContainer extends React.PureComponent {
  handleDragEnd = ({destination, source}) => {
    if (!destination) {
      return;
    }
    this.props.reorderStep(source.index, destination.index)
  }
  render(){
    return(
      <ProcedureSteps steps={this.props.steps} onDragEnd={this.handleDragEnd} />
    )
  }
}

export default connect(
  ({procedure}) => ({steps: procedure.steps}),
  { reorderStep }
)(ProcedureStepsContainer)
