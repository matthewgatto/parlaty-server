import React,{useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import UserForm from '@components/User/Form';
import UserRoleFields from '@components/UserRoleFields';
import Loader from '@components/List/Loader';
import {getById} from '@selectors/user';
import {FETCH_USER_REQUEST,UPDATE_USER_REQUEST} from '@types/user';

export default ({id}) => {
  const dispatch = useDispatch();
  const user = useSelector(getById(id));
  useEffect(() => {
    if(!user){
      dispatch({type: FETCH_USER_REQUEST, payload: id})
    }
  },[]);
  if(!user){
    return <Loader text="user" />
  }
  return(
    <UserForm
      form={{
        entity: "update_user",
        url: `/users/${id}`,
        type: UPDATE_USER_REQUEST,
        initialValues: user,
        id
      }}
      rolePanel={UserRoleFields}
    />
  )
}
