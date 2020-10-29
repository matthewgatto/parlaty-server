import React, { useCallback } from 'react';
import { Controller,useFormContext } from "react-hook-form";
import SelectComponent, {withSelectContainer} from './Select';
import CheckBoxComponent from './CheckBox';
import RadioComponent from './Radio';
import LimitedTextAreaInput from './LimitedTextArea';
import FileInputContainer from '@containers/FileInput';
import RadioContainer from '@containers/Radio';
import ArrFileInputContainer from '@containers/ArrFileInput';
import withField from './withField';
import withName from './withName';

const defChange = ([e]) => e.target.type === "checkbox" ? e.target.checked : e.target.value;

const withNamedField = (WrappedComponent) => withName(withField(WrappedComponent));
export const Select = withNamedField(withSelectContainer(props => <Controller {...props} as={SelectComponent} />));
export const FileInput = withName(props => <Controller onChange={([el]) => el.currentTarget.files[0]} {...props} as={FileInputContainer} />);
export const ArrFileInput = props => ArrFileInputContainer(props);
export const Input = withNamedField(({ onChange, ...props }) => <Controller {...props} onChange={e => onChange && onChange(e) || defChange(e)} />);
export const LimitedTextArea = withNamedField(props => <Controller {...props} as={LimitedTextAreaInput} />);
export const CheckBox = ({ onChange, ...props }) => <Input {...props} onChange={e => onChange && onChange(e) || defChange(e)} as={CheckBoxComponent} />;
export const Radio = props => RadioContainer(props);

const RadioFieldComponent = withField(RadioComponent);
const ModeRadioComponent = props => (
  <>
    <RadioFieldComponent {...props} label="Continuous" check="continuous" />
    <RadioFieldComponent {...props} label="Manual" check="manual" />
    <RadioFieldComponent {...props} label="Timed" check="timed" />
  </>
);
export const ModeRadio = ({root, onChange = null, ...props}) => {
  const {setValue} = useFormContext();
  const defChange = useCallback(([e]) => {
    if(e.target.value === "continuous" || e.target.value === "manual"){
      setValue(`${root}time`, 0);
    } else if(e.target.value === "timed"){
      setValue(`${root}time`, 2);
    }
    return e.target.value
  },[root,setValue]);
  return <Controller {...props} name={`${root}mode`} onChange={e => onChange && onChange(e) || defChange(e) } as={ModeRadioComponent} />
};
