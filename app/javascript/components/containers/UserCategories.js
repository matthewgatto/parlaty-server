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
  console.log("client",client);
  console.log("defaultClient",defaultClient);
  console.log("categories",categories);
  return categories ? (
    <CategorySelectComponent defaultValue={defaultValue} categories={categories} />
  ) : (
    <CategorySelectContainer defaultValue={defaultValue} client={client || defaultClient} />
  )
}
