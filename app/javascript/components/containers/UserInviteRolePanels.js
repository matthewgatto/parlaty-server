import React from 'react';
import {useSelector} from 'react-redux';
import {Select} from '@components/Inputs';
import UserRoleFields from '@components/UserRoleFields';
import {getUserRole} from '@selectors/auth';

export default ({formKey}) => {
  const role = useSelector(getUserRole)
  const options = role === "ParlatyAdmin" ? [{value: "parlatyadmin", label: "Parlaty Admin"}, {value: "operatoradmin", label: "Client Admin"}, {value: "author", label: "Author"}, {value: "operator", label: "Operator"}] : [{value: "operatoradmin", label: "Client Admin"}, {value: "author", label: "Author"}, {value: "operator", label: "Operator"}]
  return(<>
    <Select defaultValue={options[0].value} options={options} label="Role*" name="roleable" formKey={formKey} placeholder="Choose a role"  />
    <UserRoleFields formKey={formKey} />
  </>)
}
