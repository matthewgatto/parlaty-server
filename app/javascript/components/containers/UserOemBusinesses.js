import React from 'react';
import { useFormContext } from "react-hook-form";
import OemBusinessSelectContainer from '@containers/OemBusinessSelect';
import OemBusinessSelectComponent from '@components/OemBusinessSelect';

export default ({defaultValue,defaultClient, oemBusinesses}) => {
  const {watch} = useFormContext();
  const client = watch("client");
  if(!client && !defaultClient){
    return null
  }
  return oemBusinesses ? (
    <OemBusinessSelectComponent defaultValue={defaultValue} oem_businesses={oemBusinesses} />
  ) : (
    <OemBusinessSelectContainer defaultValue={defaultValue} client={client || defaultClient} />
  )
}
