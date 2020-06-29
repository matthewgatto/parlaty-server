import React,{useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { getUser } from '@selectors/auth';
import {FETCH_SELF_REQUEST} from '@types/auth';

export default () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  useEffect(() => {
    if(user && user.id && !user.email){
      dispatch({type: FETCH_SELF_REQUEST, payload: {url: `/users/${user.id}`, id: user.id}})
    }
  },[user,dispatch])
  return user
}
