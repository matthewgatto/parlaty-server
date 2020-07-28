import React, { useCallback, useState, useEffect } from 'react';
import { Controller,useFormContext } from "react-hook-form";
import SelectComponent, {withSelectContainer} from './Select';
import CheckBoxComponent from './CheckBox';
import RadioComponent from './Radio';
import FileInputContainer from '@containers/FileInput';
import ArrFileInputContainer from '@containers/ArrFileInput';
import withField from './withField';
import withName from './withName';

const withNamedField = (WrappedComponent) => withName(withField(WrappedComponent));
export const Select = withNamedField(withSelectContainer(props => <Controller {...props} as={SelectComponent} />));
export const FileInput = withName(props => <Controller onChange={([el]) => el.currentTarget.files[0]} {...props} as={FileInputContainer} />);
export const ArrFileInput = (props) => ArrFileInputContainer(props);

export const Input = withNamedField(Controller);
export const CheckBox = props => <Input {...props} onChange={([e]) => e.currentTarget.checked} as={CheckBoxComponent} />;

export const Radio = ({root, actionRoot, defaultValue, index, withoutCheck, ...props}) => {
  const {setValue, getValues} = useFormContext();
  const rootLink = `${root}${actionRoot}`;
  const onChange = useCallback(([e]) => {
    // if(+e.target.value === index){
    //   console.log('change', getValues()[rootLink], index, +e.target.value);
      setValue(rootLink, index);
    // }
    return e.target.value
  },[root,setValue]);
  const onClick = useCallback((e) => {
    if(withoutCheck && +getValues()[rootLink] === index) {
      // console.log('click', getValues()[rootLink], index);
      setValue(rootLink, -1);
      // return e.target.value;
    }
  },[root,setValue]);
  useEffect(()=>{
    return () => {
      if(getValues()[rootLink] >= 0) setValue(rootLink, -1);
    }
  }, []);
  console.log(rootLink, getValues()[rootLink]);
  return <Controller {...props} name={rootLink} check={index.toString()} onClick={onClick} onChange={onChange} as={RadioFieldComponent} />
};

const RadioFieldComponent = withField(RadioComponent);
const ModeRadioComponent = props => {
  return(
    <>
      <RadioFieldComponent {...props} label="Continuous" check="continuous" />
      <RadioFieldComponent {...props} label="Manual" check="manual" />
      <RadioFieldComponent {...props} label="Timed" check="timed" />
    </>
  )
};
export const ModeRadio = ({root,...props}) => {
  const {setValue} = useFormContext();
  const onChange = useCallback(([e]) => {
    if(e.target.value === "continuous" || e.target.value === "manual"){
      setValue(`${root}time`,0)
    } else if(e.target.value === "timed"){
      setValue(`${root}time`,8)
    }
    return e.target.value
  },[root,setValue]);
  return <Controller {...props} name={`${root}mode`} onChange={onChange} as={ModeRadioComponent} />
};
