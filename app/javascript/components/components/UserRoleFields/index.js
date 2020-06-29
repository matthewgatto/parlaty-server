import React from 'react';
import {useSelector} from 'react-redux';
import { useFormContext } from "react-hook-form";
import ClientSelect from '@containers/ClientSelect';
import UserCategories from '@containers/UserCategories';
import {getUser} from '@selectors/auth';

const UserRoleFieldsComponent = ({initialValues = {},formKey,roleable = initialValues.roleable, placeholder, user}) => {
  const isNotParlatyAdmin = user.roleable !== "ParlatyAdmin";
  const isClientAdmin = user.roleable === "ClientAdmin";
  const defaultClient = isClientAdmin ? user.oem : initialValues.oem;
  if(!user || !user.email){
    return null
  }
  switch (roleable.toLowerCase()) {
    case "clientadmin":
      return <ClientSelect formKey={formKey} defaultValue={defaultClient} hidden={isNotParlatyAdmin} />
    case "author":
    case "operator":
      return <>
        <ClientSelect formKey={formKey} defaultValue={defaultClient} hidden={isNotParlatyAdmin} />
        <UserCategories formKey={formKey} defaultValue={initialValues.businesses} defaultClient={defaultClient} categories={isClientAdmin && user.businesses} />
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
  const user = useSelector(getUser);
  return <UserRoleFieldsComponent {...props} user={user} />
}

export default (props) => {
  const {watch} = useFormContext();
  const roleable = watch("roleable");
  return <UserRoleFields {...props} roleable={roleable} placeholder />
}
