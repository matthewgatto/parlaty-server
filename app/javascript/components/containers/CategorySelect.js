import React,{useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { FETCH_OEM_BUSINESSES_REQUEST } from '@types/oem';
import CategorySelect from '@components/CategorySelect';

export default ({client,defaultValue}) => {
  const dispatch = useDispatch();
  const categories = useSelector(({oems,businesses}) => oems.byId[client] && oems.byId[client].businesses &&  oems.byId[client].businesses.map(id => ({value: id, label: businesses.byId[id].name})))
  useEffect(() => {
    if(!categories){
      dispatch({type: FETCH_OEM_BUSINESSES_REQUEST, payload: {url: `/oems/${client}/oem_businesses`, id: client}})
    }
  },[categories,client])
  return <CategorySelect categories={categories} defaultValue={defaultValue} />
}
