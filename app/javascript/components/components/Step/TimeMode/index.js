import React, {useEffect} from "react";
import { ModeRadio, CheckBox} from '@components/Inputs';
import {useFormContext} from "react-hook-form";


const Mode = ({root, ...props}) => {
  const { getValues, setValue } = useFormContext();
  let safety = getValues()[`${root}safety`];
  useEffect(() => {
    setValue(`${root}mode`, safety ? "manual" : "continuous");
    safety ? setValue(`${root}time`, 0) : undefined;
  }, [safety]);
  return (
    <ModeRadio disabled={safety} root={root} {...props} />
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