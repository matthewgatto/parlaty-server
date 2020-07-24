import React from 'react';
import {useSelector} from 'react-redux';
import OemBusinessSelect from '@containers/OemBusinessSelect';
import {getUser} from '@selectors/auth';

export default (props) => {
  const user = useSelector(getUser);
  return <OemBusinessSelect client={user.oem} {...props} />
}
