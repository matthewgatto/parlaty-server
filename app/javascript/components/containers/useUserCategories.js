import React,{useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { getUser } from '@selectors/auth';
import {FETCH_SELF_REQUEST} from '@types/auth';

export default () => {
  const dispatch = useDispatch();
  const {id,businesses} = useSelector(getUser);
  useEffect(() => {
    if(!businesses){
      dispatch({type: FETCH_SELF_REQUEST, payload: {url: `/users/${id}`, id}})
    }
  },[id,businesses,dispatch])
  return businesses
}
