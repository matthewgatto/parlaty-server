import React from 'react';
import { connect } from 'react-redux';
import Select from '../components/Select';
import { updateFormValue } from '../store/form';

class SelectContainer extends React.PureComponent {
  handleChange = ({target}) => {
    this.props.updateFormValue(this.props.form, this.props.name, target.value)
  }
  render(){
    return(
      <Select {...this.props} onChange={this.handleChange} />
    )
  }
}

export default connect(
  ({form}, props) => ({value: form[props.form] ? form[props.form].values[props.name] : ''}),
  { updateFormValue }
)(SelectContainer);
