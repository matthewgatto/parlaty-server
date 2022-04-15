import React from 'react';
import {useSelector} from 'react-redux';
import Loader from '@components/List/Loader';
import {getUser} from '@selectors/auth';

export default (WrappedComponent) => (props) => {
  const user = useSelector(getUser)
  console.log(user);
  if(!user){
    return <Loader text="user" />
  }
  return <WrappedComponent {...props} user={user} />
}
