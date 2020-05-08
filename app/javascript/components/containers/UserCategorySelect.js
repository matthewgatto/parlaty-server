import React from 'react';
import {useSelector} from 'react-redux';
import CategorySelect from '@containers/CategorySelect';
import {getUser} from '@selectors/auth';

export default (props) => {
  const user = useSelector(getUser);
  return <CategorySelect client={user.oem} {...props} />
}
