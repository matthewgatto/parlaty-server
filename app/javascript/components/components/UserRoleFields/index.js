import React from 'react';
import { useFormContext } from "react-hook-form";
import ClientSelect from '@containers/ClientSelect';
import UserCategories from '@containers/UserCategories';
import useUserInfo from '@containers/useUserInfo';

const UserRoleFieldsComponent = ({initialValues = {},formKey,roleable = initialValues.roleable, placeholder, user}) => {
  switch (roleable.toLowerCase()) {
    case "clientadmin":
      <ClientSelect formKey={formKey} defaultValue={initialValues.oem} hidden={user.roleable !== "ParlatyAdmin"} />
    case "author":
    case "operator":
      return <>
        <ClientSelect formKey={formKey} defaultValue={initialValues.oem} hidden={user.roleable !== "ParlatyAdmin"} />
        <UserCategories formKey={formKey} defaultValue={initialValues.businesses} defaultClient={initialValues.oem || user.oem} categories={user.roleable === "ClientAdmin" && user.businesses} />
      </>
    case "parlatyadmin":
      if(placeholder){
        return <div>No additional role information needed</div>
      } else {
        return <div>User is a Parlaty Admin</div>
      }
    default:
      return null
  }
}

export const UserRoleFields = (props) => {
  const user = useUserInfo();
  return <UserRoleFieldsComponent {...props} user={user} />
}

export default (props) => {
  const {watch} = useFormContext();
  const roleable = watch("roleable");
  return <UserRoleFields {...props} roleable={roleable} placeholder />
}
