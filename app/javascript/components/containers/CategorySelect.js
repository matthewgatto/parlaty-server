import React,{useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { FETCH_OEM_BUSINESSES_REQUEST } from '@types/oem';
import CategorySelect from '@components/CategorySelect';

export default ({client,defaultValue}) => {
  const dispatch = useDispatch();
  const oem_businesses = useSelector(({oems}) => oems.byId[client] && oems.byId[client].oem_businesses)
  useEffect(() => {
    if(!oem_businesses){
      dispatch({type: FETCH_OEM_BUSINESSES_REQUEST, payload: {url: `/oems/${client}/oem_businesses`, id: client}})
    }
  },[oem_businesses,client])
  return <CategorySelect categories={oem_businesses} defaultValue={defaultValue} />
}
