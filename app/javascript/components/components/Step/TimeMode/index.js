import React from "react";
import { ModeRadio, CheckBox} from '@components/Inputs';
import {useFormContext} from "react-hook-form";


const Mode = ({defaultValue, ...props}) => {
  const {watch} = useFormContext();
  let safety = watch(`${props.root}safety`);
  if(safety) {
    defaultValue = "manual";
  }
  return (
    <ModeRadio disabled={safety} {...props} defaultValue={defaultValue} />
  )
}

export default ({formKey, defaultValue, root , onChange}) => {
  return(
    <>
      <Mode onChange={onChange} formKey={formKey} root={root} name="mode" defaultValue={defaultValue.mode || "continuous"}/>
      <CheckBox onChange={onChange} formKey={formKey} label="Safety" root={root} name="safety" defaultValue={defaultValue.safety || false} />
    </>
  )
}