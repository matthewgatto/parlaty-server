import React, { useCallback } from 'react';
import {Controller, useFormContext} from "react-hook-form";
import withField from "../components/Inputs/withField";
import Radio from "../components/Inputs/Radio";
import { useDispatch } from "react-redux";
import { setStepValues } from '@actions/template'
const RadioField = withField(Radio);

export default ({root, actionRoot, defaultValue, setTabValues, index, withoutChecked, name, ...props}) => {
  const dispatch = useDispatch();
  const {setValue, getValues} = useFormContext();
  const onChange = useCallback(([e]) => {
    setValue(name, index);
    setTabValues ? setTabValues(prevValue => ({...prevValue, [actionRoot]: index}) ) : null
    dispatch(setStepValues(props.idx, {[name.split(root).pop()]: index}));
    return e.target.value
  },[root,setValue]);
  const onClick = useCallback((e) => {
    if(withoutChecked && +getValues()[name] === index) {
      setValue(name, -1);
      setTabValues ? setTabValues(prevValue => ({...prevValue, [actionRoot]: -1}) ) : null
      dispatch(setStepValues(props.idx, {[name.split(root).pop()]: -1}));
      e.target.checked = false
    }
  },[root,setValue]);
  return <Controller {...props} name={name} check={ index.toString()} withoutChecked={withoutChecked} onClick={onClick} onChange={onChange} defaultValue={defaultValue.toString()} as={RadioField} />
}