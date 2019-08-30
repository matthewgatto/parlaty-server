import React from 'react';
import { connect } from 'react-redux'
import ProcedureSteps from '../components/ProcedureSteps';
import { reorderStep } from '../store/procedure';

class ProcedureStepsContainer extends React.PureComponent {
  dragging = null;
  draggingOver = null
  handleDragStart = (e, number) => {
    e.dataTransfer.setData("text/html", e.target);
    e.dataTransfer.setDragImage(e.target, 20, 20);
    this.dragging = number;
  }
  handleDragEnd = (number) => {
    if(this.dragging !== null && this.draggingOver !==null && this.dragging !== this.draggingOver){
      this.props.reorderStep(this.dragging, this.draggingOver);
    }
    this.dragging = null;
    this.draggingOver = null;
  }
  handleDragOver = (number) => {
    this.draggingOver = number
  }
  render(){
    return(
      <ProcedureSteps steps={this.props.steps} onDragOver={this.handleDragOver} onDragStart={this.handleDragStart} onDragEnd={this.handleDragEnd} />
    )
  }
}

export default connect(
  ({procedure}) => ({steps: procedure.steps}),
  { reorderStep }
)(ProcedureStepsContainer)
