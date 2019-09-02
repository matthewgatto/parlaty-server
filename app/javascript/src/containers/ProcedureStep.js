import React from 'react';
import { connect } from 'react-redux';
import ProcedureStep from '../components/ProcedureStep';
import { openForm, closeForm } from '../store/form';

class ProcedureStepContainer extends React.PureComponent {
  componentDidUpdate(prevProps){
    if(this.props.isDragging && this.props.formOpen){
      this.props.closeForm();
    }
  }
  openForm = () => {
    this.props.openForm("step", "edit", this.props.step.id, this.props.step);
  }
  render(){
    return(
      <ProcedureStep {...this.props.provided.dragHandleProps} {...this.props.provided.draggableProps} setRef={this.props.provided.innerRef} idx={this.props.idx} openForm={this.openForm} step={this.props.step} />
    )
  }
}

export default connect(
  ({form}, {step}) => ({formOpen: form.id === step.id}),
  { openForm, closeForm }
)(ProcedureStepContainer)
