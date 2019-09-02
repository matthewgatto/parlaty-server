import React from 'react';
import { connect } from 'react-redux';
import Input from '../components/Input';
import { updateFormValue } from '../store/form';

class InputContainer extends React.PureComponent {
  handleChange = ({target}) => {
    this.props.updateFormValue(this.props.form, this.props.name, target.value)
  }
  render(){
    return(
      <Input {...this.props} onChange={this.handleChange} />
    )
  }
}

export default connect(
  ({form}, props) => ({value: (form[props.form] && form[props.form].values && form[props.form].values[props.name]) ? form[props.form].values[props.name] : ''}),
  { updateFormValue }
)(InputContainer);
