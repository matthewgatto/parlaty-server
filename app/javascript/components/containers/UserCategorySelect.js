import React from 'react';
import CategorySelect from '@containers/CategorySelect';
import useUserInfo from '@containers/useUserInfo';

export default (props) => {
  const user = useUserInfo();
  return <CategorySelect client={user && user.oem} {...props} />
}
