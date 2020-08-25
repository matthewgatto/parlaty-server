import React, {useRef, useEffect, useCallback} from 'react';
import {Controller, useFormContext} from "react-hook-form";
import withField from "../components/Inputs/withField";
import Radio from "../components/Inputs/Radio";

const RadioField = withField(Radio);

export default ({root, actionRoot, defaultValue, index, withoutChecked, name, ...props}) => {
  const {setValue, getValues} = useFormContext();
  const onChange = useCallback(([e]) => {
    setValue(name, index);
    return e.target.value
  },[root,setValue]);
  const onClick = useCallback((e) => {
    if(withoutChecked && +getValues()[name] === index) {
      console.log('click', e.target.value, index);
      setValue(name, '-1');
      // return e.target.value;
    }
  },[root,setValue]);
  // useEffect(()=>{
  //   return () => {
  //     if(getValues()[name] >= 0) setValue(name, '-1');
  //   }
  // }, []);
  return <Controller {...props} name={name} check={index.toString()} withoutChecked={withoutChecked} onClick={onClick} onChange={onChange} as={RadioField} />
}