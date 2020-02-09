import React, {useEffect} from 'react';
import { Controller, useFormContext } from "react-hook-form";
import { useSelector } from 'react-redux';
import Error from '@components/Error';
import {FieldWrapper} from '../Field';
import {LabelWrapper} from '../Label';
import {getParameterError} from '@selectors/form';
import styles from './index.module.css';

const ParameterErrors = ({formKey}) => {
  const error = useSelector(getParameterError(formKey))
  return <Error error={error} />
}

const ParameterValueSetter = ({search, root}) => {
  const { setValue } = useFormContext()
  const parameterValue = useSelector(({actions:{byId}}) => {
    for (var id in byId) {
      if (byId.hasOwnProperty(id) && byId[id].parameter_name == search) {
        return byId[id].parameter_value_8_pack;
      }
    }
  })
  useEffect(() => {
    if(parameterValue){
      setValue(`${root}parameter_value_8_pack`, parameterValue)
    }
  }, [parameterValue, setValue, root])
  return null;
}

class ParameterValueSetterContainer extends React.Component {
  state = {search: null};
  componentDidUpdate(prevProps){
    if(prevProps.value && this.props.value && this.props.value.length > 2 && prevProps.value != this.props.value){
      this.setState({search: this.props.value})
    }
  }
  render(){
    return <ParameterValueSetter search={this.state.search} root={this.props.root} />
  }
}

const ParameterNameInput = ({root, ...props}) => (<>
    <input {...props} />
    <ParameterValueSetterContainer root={root} value={props.value} />
  </>)


export const StatelessParameters = ({action, value}) => (
  <FieldWrapper className={styles.container}>
    <LabelWrapper>
      <div>Action Parameters</div>
    </LabelWrapper>
    <div className={styles.column}>
    {action ? (<>
        <div className={`${styles.nameFieldContainerTwo} align_center`}>
        <div className={styles.label}>
          Name:
        </div>
        <div className={`${styles.nameFieldInputWrapperTwo} align_center`}>
          {action.parameter_name}
        </div>
        </div>
        <div className={`${styles.valueFieldContainerTwo} align_center`}>
        <div className={styles.label}>
          Value:
        </div>
        <div className={`${styles.valueFieldInputWrapperTwo} align_center`}>
          {action.parameter_value_8_pack}
        </div>
        </div>
    </>) : <div className={styles.actionParameterPlaceholder}>{value ? "No action selected" : "No device selected"}</div>}
    </div>
  </FieldWrapper>
)

export default ({root, formKey, initialName, initialValue}) => (
  <FieldWrapper className={styles.container}>
    <LabelWrapper>
      <div>Default Parameter</div>
      <ParameterErrors formKey={formKey} />
    </LabelWrapper>
    <div className={`${styles.row} align_center`}>
      <div className={`${styles.nameFieldContainer} align_center`}>
      <div className={styles.label}>
        Name:
      </div>
      <div className={`${styles.nameFieldInputWrapper} align_center`}>
      <Controller name={`${root}parameter_name`} root={root} defaultValue={initialName} as={ParameterNameInput} />
      </div>
      </div>
      <div className={`${styles.valueFieldContainer} align_center`}>
      <div className={styles.label}>
        Value:
      </div>
      <div className={`${styles.valueFieldInputWrapper} align_center`}>
      <Controller name={`${root}parameter_value_8_pack`} defaultValue={initialValue} as="input" />
      </div>
      </div>
    </div>
  </FieldWrapper>
)
