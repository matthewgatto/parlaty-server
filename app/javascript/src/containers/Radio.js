import React from 'react';
import { connect } from 'react-redux';
import Radio from '../components/Radio';
import { updateFormValue } from '../store/form';

class RadioContainer extends React.PureComponent {
  handleChange = ({target}) => {
    this.props.updateFormValue(this.props.form, this.props.name, target.value)
  }
  render(){
    return(
      <Radio nane={this.props.name} label={this.props.label} checked={this.props.checked} value={this.props.value} onChange={this.handleChange} />
    )
  }
}

export default connect(
  ({form}, props) => ({checked: form[props.form] ? form[props.form].values[props.name] === props.value : ''}),
  { updateFormValue }
)(RadioContainer);
