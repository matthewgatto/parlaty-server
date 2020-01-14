import React from 'react';
import { Controller } from "react-hook-form";
import { useSelector } from 'react-redux';
import Error from '../Error';
import SelectComponent, {withSelectContainer} from './Select';
import FileInputComponent from './FileInput';
import CheckBoxComponent from './CheckBox';
import RadioComponent from './Radio';
import Field from './Field';
import withField from './withField';
import {makeName} from '../../utils'

export const Select = withField(withSelectContainer(({defaultValue, root, ...props}) => <Controller defaultValue={defaultValue} name={makeName(root, props.name)} as={<SelectComponent {...props} />} />))
export const FileInput = ({defaultValue, root, name, ...props}) => {
  const inputName = makeName(root, name);
  return <Controller onChange={([el]) => el.currentTarget.files[0]} defaultValue={defaultValue} name={inputName} as={<FileInputComponent {...props} name={inputName} />} />
}
export const Input = withField(({name, root, ...props}) => <Controller name={makeName(root, name)} {...props} as="input" />)
export const Textarea = withField(({name, root, ...props}) => <Controller name={makeName(root, name)} {...props} as="textarea" />)
export const CheckBox = withField(props => {
  const inputName = makeName(props.root, props.name);
  return <Controller defaultValue={props.defaultValue} onChange={([e]) => (e.currentTarget.checked)} name={inputName} as={<CheckBoxComponent name={inputName} defaultValue={props.defaultValue} />} />
})
export const Radio = withField(({defaultValue, root, name, ...props}) => {
  const inputName = makeName(root, name);
  return <Controller defaultValue={defaultValue} name={inputName} as={<RadioComponent {...props} name={inputName} />} />
})

const RadioComponentWithLabel = withField(RadioComponent)
const ModeRadioComponent = props => (
  <>
    <RadioComponentWithLabel {...props} label="Continuous" check="continuous" />
    <RadioComponentWithLabel {...props} label="Manual" check="manual" />
  </>
)
export const ModeRadio = ({defaultValue, root, name, ...props}) => {
  const inputName = makeName(root, name);
  return <Controller defaultValue={defaultValue} name={inputName} as={<ModeRadioComponent {...props} name={inputName} />} />
}

const ParameterErrors = ({formKey}) => {
  const error = useSelector(({form}) => form[formKey] && form[formKey].errors && form[formKey].errors.fieldErrors && (form[formKey].errors.fieldErrors.parameter_name || form[formKey].errors.fieldErrors.parameter_value_8_pack) ? "This field is required" : undefined)
  return <Error error={error} />
}

export const ParameterFields = ({root, formKey, initialName, initialValue}) => (
  <label className="field parameter_fields">
    <div className="field__label">
      <div>Parameter*</div>
      <ParameterErrors formKey={formKey} />
    </div>
    <div className="parameter_fields__row">
      <div className="parameter_fields__label">
        Name:
      </div>
      <Controller name={`${root}parameter_name`} defaultValue={initialName} as="input" />
      <div className="parameter_fields__label">
        Value:
      </div>
      <Controller name={`${root}parameter_value_8_pack`} defaultValue={initialValue} as="input" />
    </div>
  </label>
)
