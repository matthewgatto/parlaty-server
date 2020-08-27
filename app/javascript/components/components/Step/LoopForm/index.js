import React, {useCallback, useEffect} from "react";
import { Input, CheckBox} from '@components/Inputs';
import styles from './index.module.css';
import {useFormContext} from "react-hook-form";


const LoopInputs = ({defaultValue, className, ...props}) => {
  const {watch} = useFormContext();
  let mode = watch(`${props.root}enabled_loop`);
  if(mode === undefined) mode = defaultValue.enabled_loop;
  if(!mode) className += " " + styles.disabled;
  return (<>
      <Input className={className} disabled={!mode} {...props} defaultValue={defaultValue.steps_in_loop || 1} label="Steps in loop" name="steps_in_loop" />
      <Input className={className} disabled={!mode} {...props} defaultValue={defaultValue.loop_value || 1} label="Number of Loops" name="loop_value" />
    </>)
}

export default ({formKey, defaultValue, root }) => {
  return(
    <div className={styles.container}>
      <CheckBox className={styles.checkbox} formKey={formKey} label="Loop Step(s)" root={root} name="enabled_loop" defaultValue={defaultValue.enabled_loop || false} />
      <LoopInputs as="input" className={styles.input} defaultValue={defaultValue} formKey={formKey} type="text" root={root}/>
    </div>
  )
}