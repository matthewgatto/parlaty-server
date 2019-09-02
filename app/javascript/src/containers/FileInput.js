import React from 'react';
import { connect } from 'react-redux';
import FileInput from '../components/FileInput';
import { updateFormValue } from '../store/form';

class FileInputContainer extends React.PureComponent {
  inputRef = null;
  onChange = ({target}) => {
    this.props.updateFormValue(this.props.form, this.props.name, target.files[0]);
  }
  onClick = () => {
    if(this.props.hasValue){
      this.props.updateFormValue(this.props.form, this.props.name, null);
      this.inputRef.value = '';
    } else {
      this.inputRef.click();
    }
  }
  setInputRef = (e) => {
    this.inputRef = e;
  }
  render(){
    let { updateFormValue, ...rest } = this.props;
    return(
      <FileInput {...rest} onChange={this.onChange} onClick={this.onClick} setInputRef={this.setInputRef} />
    )
  }
}

export default connect(
  ({form}, props) => ({hasValue: form[props.form] && form[props.form].values[props.name] ? true : false, fileName: form[props.form] && form[props.form].values[props.name] ? form[props.form].values[props.name].name : false, value: form[props.form] ? form[props.form].values[props.name] : '', error: form[props.form] && form[props.form].inputErrors && form[props.form].inputErrors[props.name]}),
  { updateFormValue }
)(FileInputContainer);
