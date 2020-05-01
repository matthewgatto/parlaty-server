import React from 'react';
import {Select} from '@components/Inputs';
import UserRoleFields from '@components/UserRoleFields';

export default ({formKey, userRole}) => {
  const options = userRole === "ParlatyAdmin" ? [{value: "parlatyadmin", label: "Parlaty Admin"}, {value: "clientadmin", label: "Client Admin"}, {value: "author", label: "Author"}, {value: "operator", label: "Operator"}] : [{value: "clientadmin", label: "Client Admin"}, {value: "author", label: "Author"}, {value: "operator", label: "Operator"}]
  return(<>
    <Select defaultValue={options[0].value} options={options} label="Role*" name="roleable" formKey={formKey} placeholder="Choose a role"  />
    <UserRoleFields formKey={formKey} userRole={userRole} />
  </>)
}
