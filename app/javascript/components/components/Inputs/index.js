import React,{useCallback} from 'react';
import { Controller,useFormContext } from "react-hook-form";
import SelectComponent, {withSelectContainer} from './Select';
import CheckBoxComponent from './CheckBox';
import RadioComponent from './Radio';
import FileInputContainer from '@containers/FileInput';
import Field from './Field';
import withField from './withField';
import withName from './withName';

const withNamedField = (WrappedComponent) => withName(withField(WrappedComponent))
export const Select = withNamedField(withSelectContainer(props => <Controller {...props} as={SelectComponent} />))
export const FileInput = withName(props => <Controller onChange={([el]) => el.currentTarget.files[0]} {...props} as={FileInputContainer} />)

export const Input = withNamedField(Controller)
export const CheckBox = props => <Input {...props} onChange={([e]) => e.currentTarget.checked} as={CheckBoxComponent} />

const RadioFieldComponent = withField(RadioComponent);
const ModeRadioComponent = props => {
  return(
    <>
      <RadioFieldComponent {...props} label="Continuous" check="continuous" />
      <RadioFieldComponent {...props} label="Manual" check="manual" />
      <RadioFieldComponent {...props} label="Timed" check="timed" />
    </>
  )
}
export const ModeRadio = ({root,...props}) => {
  const {setValue} = useFormContext();
  const onChange = useCallback(([e]) => {
    if(e.target.value === "continuous" || e.target.value === "manual"){
      setValue(`${root}time`,0)
    } else if(e.target.value === "timed"){
      setValue(`${root}time`,8)
    }
    return e.target.value
  },[root,setValue])
  return <Controller {...props} name={`${root}mode`} onChange={onChange} as={ModeRadioComponent} />
}
