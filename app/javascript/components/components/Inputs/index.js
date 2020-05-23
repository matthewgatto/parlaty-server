import React from 'react';
import { Controller } from "react-hook-form";
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
const ModeRadioComponent = props => (
  <>
    <RadioFieldComponent {...props} label="Continuous" check="continuous" />
    <RadioFieldComponent {...props} label="Manual" check="manual" />
  </>
)
export const ModeRadio = withName(props => <Controller {...props} as={ModeRadioComponent} />)
