import React from 'react';
import { connect } from 'react-redux';
import FileInput from '../components/FileInput';
import { updateFormValue } from '../store/form';

class FileInputContainer extends React.PureComponent {
  inputRef = null;
  fileName = null;
  onChange = ({target}) => {
    this.fileName = target.files[0].name;
    this.props.updateFormValue(this.props.form, this.props.name, target.files[0]);
  }
  onClick = () => {
    if(this.props.hasValue){
      this.fileName = null;
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
      <FileInput {...rest} onChange={this.onChange} hasValue={this.props.hasValue} fileName={this.fileName} onClick={this.onClick} setInputRef={this.setInputRef} />
    )
  }
}

export default connect(
  ({form}, props) => ({hasValue: form[props.form] && form[props.form].values[props.name] ? true : false, value: form[props.form] ? form[props.form].values[props.name] : '', error: form[props.form] && form[props.form].inputErrors && form[props.form].inputErrors[props.name]}),
  { updateFormValue }
)(FileInputContainer);
