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


export const StatelessParameters = ({action, value, root}) => (
  <FieldWrapper className={styles.container}>
    <LabelWrapper>
      <div>Action Parameters</div>
    </LabelWrapper>
    <div className={styles.inputRow}>
    {action ? (<>
        <div className={styles.parameterName}>
          {action.parameter_name}
        </div>
        <Controller as='input' className={styles.valueField} name={`${root}actions[${action.id}]`} defaultValue={action.parameter_value_8_pack} />
    </>) : <div className={styles.actionParameterPlaceholder}>{value ? "No action selected" : "No device selected"}</div>}
    </div>
  </FieldWrapper>
)

export default ({root, formKey, initialName, initialValue}) => {
  const nameStr = `${root}parameter_name`;
  const valueStr = `${root}parameter_value_8_pack`;
  return(
    <div className={styles.container}>
      <LabelWrapper>
        <div>Default Parameter</div>
        <ParameterErrors formKey={formKey} />
      </LabelWrapper>
      <div className={`${styles.row} align_center`}>
        <div className={`${styles.nameFieldContainer} align_center`}>
        <label className={styles.label} for={nameStr}>
          Name:
        </label>
        <div className={`${styles.nameFieldInputWrapper} align_center`}>
        <Controller name={nameStr} root={root} defaultValue={initialName} as={ParameterNameInput} />
        </div>
        </div>
        <div className={`${styles.valueFieldContainer} align_center`}>
        <label className={styles.label} for={valueStr}>
          Value:
        </label>
        <div className={`${styles.valueFieldInputWrapper} align_center`}>
        <Controller name={valueStr} defaultValue={initialValue} as="input" />
        </div>
        </div>
      </div>
    </div>
  )
}
