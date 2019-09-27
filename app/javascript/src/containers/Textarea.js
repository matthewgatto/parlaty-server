import React from 'react';
import { connect } from 'react-redux';
import Textarea from '../components/Textarea';
import { updateFormValue } from '../store/form';

class TextareaContainer extends React.PureComponent {
  handleChange = ({target}) => {
    this.props.updateFormValue(this.props.form, this.props.name, target.value)
  }
  render(){
    return(
      <Textarea {...this.props} onChange={this.handleChange} />
    )
  }
}

export default connect(
  ({form}, props) => ({value: form[props.form] ? form[props.form].values[props.name] : ''}),
  { updateFormValue }
)(TextareaContainer);
