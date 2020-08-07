import React, {useRef, useEffect, useCallback} from 'react';
import {Controller, useFormContext} from "react-hook-form";
import withField from "../components/Inputs/withField";
import Radio from "../components/Inputs/Radio";

const RadioField = withField(Radio);

export default ({root, actionRoot, defaultValue, index, withoutCheck, name, ...props}) => {
  const {setValue, getValues} = useFormContext();
  const onChange = useCallback(([e]) => {
    // if(+e.target.value === index){
    //   console.log('change', getValues()[rootLink], index, +e.target.value);
    setValue(name, index);
    // }
    return e.target.value
  },[root,setValue]);
  const onClick = useCallback((e) => {
    if(withoutCheck && +getValues()[name] === index) {
      // console.log('click', getValues()[rootLink], index);
      setValue(name, '-1');
      // return e.target.value;
    }
  },[root,setValue]);
  // useEffect(()=>{
  //   return () => {
  //     if(getValues()[name] >= 0) setValue(name, '-1');
  //   }
  // }, []);
  console.log(name, getValues()[name]);
  return <Controller {...props} name={name} check={index.toString()} onClick={onClick} onChange={onChange} as={RadioField} />
}