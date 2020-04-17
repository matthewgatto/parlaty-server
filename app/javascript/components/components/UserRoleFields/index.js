import React from 'react';
import { useFormContext } from "react-hook-form";
import ClientSelect from '@containers/ClientSelect';
import CategorySelect from '@containers/CategorySelect';

export const StatelessUserRoleFields = ({initialValues = {},formKey,roleable = initialValues.roleable}) => {
  switch (roleable.toLowerCase()) {
    case "clientadmin":
      return <ClientSelect formKey={formKey} defaultValue={initialValues.oem} />
    case "author":
    case "operator":
      return <>
        <ClientSelect formKey={formKey} defaultValue={initialValues.oem} />
        <CategorySelect formKey={formKey} defaultValue={initialValues.businesses} defaultClient={initialValues.oem} />
      </>
    default:
      return null
  }
}

export default (props) => {
  const {watch} = useFormContext();
  const roleable = watch("roleable");
  return <StatelessUserRoleFields {...props} roleable={roleable} />
}
