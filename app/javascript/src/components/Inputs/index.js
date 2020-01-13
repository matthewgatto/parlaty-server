import React from 'react';
import { Controller } from "react-hook-form";
import SelectComponent, {withSelectContainer} from './Select';
import FileInputComponent from './FileInput';
import CheckBoxComponent from './CheckBox';
import RadioComponent from './Radio';
import withLabel from './withLabel';
import {makeName} from '../../utils'

export const Select = withLabel(withSelectContainer(({defaultValue, root, ...props}) => <Controller defaultValue={defaultValue} name={makeName(root, props.name)} as={<SelectComponent {...props} />} />))
export const FileInput = ({defaultValue, root, name, ...props}) => {
  const inputName = makeName(root, name);
  return <Controller onChange={([el]) => el.currentTarget.files[0]} defaultValue={defaultValue} name={inputName} as={<FileInputComponent {...props} name={inputName} />} />
}
export const Input = withLabel(({name, root, ...props}) => <Controller name={makeName(root, name)} {...props} as="input" />)
export const Textarea = withLabel(({name, root, ...props}) => <Controller name={makeName(root, name)} {...props} as="textarea" />)
export const CheckBox = withLabel(props => {
  const inputName = makeName(props.root, props.name);
  return <Controller defaultValue={props.defaultValue} onChange={([e]) => (e.currentTarget.checked)} name={inputName} as={<CheckBoxComponent name={inputName} defaultValue={props.defaultValue} />} />
})
export const Radio = withLabel(({defaultValue, root, name, ...props}) => {
  const inputName = makeName(root, name);
  return <Controller defaultValue={defaultValue} name={inputName} as={<RadioComponent {...props} name={inputName} />} />
})

const RadioComponentWithLabel = withLabel(RadioComponent)
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
