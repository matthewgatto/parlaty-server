import React from 'react';
import { useFormContext } from "react-hook-form";
import CategorySelectContainer from '@containers/CategorySelect';
import CategorySelectComponent from '@components/CategorySelect';

export default ({defaultValue,defaultClient, categories}) => {
  const {watch} = useFormContext();
  const client = watch("client");
  if(!client && !defaultClient){
    return null
  }
  return categories ? (
    <CategorySelectComponent defaultValue={defaultValue} categories={categories} />
  ) : (
    <CategorySelectContainer defaultValue={defaultValue} client={client || defaultClient} />
  )
}
