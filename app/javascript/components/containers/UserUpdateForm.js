import React,{useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import UserForm from '@components/User/Form';
import {UserRoleFields} from '@components/UserRoleFields';
import Loader from '@components/List/Loader';
import {getById} from '@selectors/user';
import {FETCH_USER_REQUEST,UPDATE_USER_REQUEST} from '@types/user';

export default ({id, role}) => {
  const dispatch = useDispatch();
  const user = useSelector(getById(id));
  useEffect(() => {
    if(!user || (user.roleable === "ClientAdmin" && !user.oem) || ((user.roleable === "Author" || user.roleable === "Operator") && !user.oem_business_ids)){
      dispatch({type: FETCH_USER_REQUEST, payload: id})
    }
  },[]);
  if(!user || (user.roleable === "ClientAdmin" && !user.oem) || ((user.roleable === "Author" || user.roleable === "Operator") && !user.oem_business_ids)){
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
      userRole={role}
      rolePanel={UserRoleFields}
    />
  )
}
