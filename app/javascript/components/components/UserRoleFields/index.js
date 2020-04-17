import React from 'react';
import { useFormContext } from "react-hook-form";
import ClientSelect from '@containers/ClientSelect';
import CategorySelect from '@containers/CategorySelect';

export default ({formKey,initialValues}) => {
  const {watch} = useFormContext();
  const roleable = watch("roleable");
  switch (roleable) {
    case "clientadmin":
      return <ClientSelect formKey={formKey} defaultValue={initialValues && initialValues.oem} />
    case "author":
    case "operator":
      return <>
        <ClientSelect formKey={formKey} defaultValue={initialValues && initialValues.oem} />
        <CategorySelect formKey={formKey} defaultValue={initialValues && initialValues.businesses} defaultClient={initialValues && initialValues.oem} />
      </>
    default:
      return null
  }
}
