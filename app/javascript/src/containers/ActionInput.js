import React from 'react';
import { connect } from 'react-redux';
import Input from '../components/Input';
import { updateActionValue } from '../store/form';

class ActionInput extends React.PureComponent {
  handleChange = ({target}) => {
    this.props.updateActionValue(this.props.idx, target.value)
  }
  render(){
    let { idx, ...rest } = this.props;
    return(
      <Input {...rest} onChange={this.handleChange} />
    )
  }
}

export default connect(
  ({form}, props) => ({value: (form.step && form.step.values && form.step.values.actions && form.step.values.actions[props.idx]) ? form.step.values.actions[props.idx] : ''}),
  { updateActionValue }
)(ActionInput);
