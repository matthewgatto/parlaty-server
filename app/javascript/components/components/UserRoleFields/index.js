import React from 'react';
import { useFormContext } from "react-hook-form";
import ClientSelect from '@containers/ClientSelect';
import CategorySelect from '@containers/CategorySelect';

export default ({formKey,initialValues}) => {
  const {watch} = useFormContext();
  const roleable = watch("roleable");
  switch (roleable) {
    case "clientadmin":
      return <ClientSelect formKey={formKey} defaultValue={initialValues && initialValues.client} />
    case "author":
    case "operator":
      return <>
        <ClientSelect formKey={formKey} defaultValue={initialValues && initialValues.client} />
        <CategorySelect formKey={formKey} defaultValue={initialValues && initialValues.categories} defaultClient={initialValues && initialValues.client} />
      </>
    default:
      return null
  }
}
