import React from 'react';
import { connect } from 'react-redux';
import Step from '../components/Step';
import { setStep } from '../redux/reducers/form';

class StepContainer extends React.PureComponent {
  componentDidUpdate(prevProps){
    if(this.props.isDragging && this.props.isOpen){
      this.props.setStep(null);
    }
  }
  render(){
    return(
      <Step {...this.props.provided.dragHandleProps} {...this.props.provided.draggableProps} setRef={this.props.provided.innerRef} idx={this.props.idx} steps={this.props.steps} arrayHelpers={this.props.arrayHelpers} />
    )
  }
}

export default connect(
  ({form}, {idx}) => ({isOpen: (form.step && form.step.idx === idx) ? true : false}),
  { setStep }
)(StepContainer)
