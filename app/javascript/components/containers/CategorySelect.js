import React,{useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { FETCH_OEM_BUSINESSES_REQUEST } from '@types/oem';
import CategorySelect from '@components/CategorySelect';

export default ({client,defaultValue}) => {
  const dispatch = useDispatch();
  const categories = useSelector(({oems}) => oems.byId[client] && oems.byId[client].businesses)
  useEffect(() => {
    if(!categories){
      dispatch({type: FETCH_OEM_BUSINESSES_REQUEST, payload: {url: `/oems/${client}/oem_businesses`, id: client}})
    }
  },[categories,client])
  return <CategorySelect categories={categories} defaultValue={defaultValue} />
}
