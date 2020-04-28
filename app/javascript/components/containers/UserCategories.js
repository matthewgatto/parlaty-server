import React from 'react';
import { useFormContext } from "react-hook-form";
import CategorySelect from '@containers/CategorySelect';

export default ({defaultValue,defaultClient}) => {
  const {watch} = useFormContext();
  const client = watch("client");
  if(!client && !defaultClient){
    return null
  }
  return <CategorySelect defaultValue={defaultValue} client={client || defaultClient} />
}
