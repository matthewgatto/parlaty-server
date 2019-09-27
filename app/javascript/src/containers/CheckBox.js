import React from 'react';
import { connect } from 'react-redux';
import CheckBox from '../components/CheckBox';
import { updateFormValue } from '../store/form';

class CheckBoxContainer extends React.PureComponent {
  handleChange = ({target}) => {
    this.props.updateFormValue(this.props.form, this.props.name, target.checked)
  }
  render(){
    return(
      <CheckBox {...this.props} onChange={this.handleChange} />
    )
  }
}

export default connect(
  ({form}, props) => ({value: form[props.form] ? form[props.form].values[props.name] : ''}),
  { updateFormValue }
)(CheckBoxContainer);
