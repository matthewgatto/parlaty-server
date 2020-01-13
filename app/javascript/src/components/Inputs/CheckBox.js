import React, {useEffect} from 'react';
import { useFormContext } from "react-hook-form";

const useInitialValues = (name,initialValue) => {
  const { register, setValue } = useFormContext()
  useEffect(() => {
    if(initialValue !== undefined){
      setValue(name, initialValue)
    }
  },[])
  return register
}

export default ({defaultValue, onChange, name, checked}) => {
  return <input onChange={onChange} type="checkbox" name={name} checked={checked || false} />
}
