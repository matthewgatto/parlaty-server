import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useFormContext} from "react-hook-form";
import {Input} from '@components/Inputs';
import {getPrevStepFormId} from '@selectors/step'
import styles from './index.module.css';

const CheckBox = ({onChange, name, checked}) => <input onChange={onChange} type="checkbox" name={name} checked={checked || false} />

export default ({labelClass, idx, ...props}) => {
  const { register, setValue, watch } = useFormContext();
  const prevStepFormId = useSelector(getPrevStepFormId(idx));
  const titleField = props.root+"title";
  const prevSpokenField = `steps[${prevStepFormId}].spoken`
  const prevTitleField = `steps[${prevStepFormId}].title`;
  const {[titleField]: title, [prevTitleField]: prevTitle, [prevSpokenField]: prevSpoken} = watch([titleField, prevTitleField, prevSpokenField]);
  useEffect(() => {
    if(props.defaultValue !== undefined){
      setValue(props.root+"spoken", props.defaultValue)
    }
  },[])
  return <Input labelClass={(prevSpoken && title == prevTitle) ? `${labelClass} ${styles.hidden}` : labelClass} {...props} onChange={([e]) => (e.currentTarget.checked)} label="Spoken" name="spoken" as={CheckBox} />
}
