import React,{useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { FETCH_OEM_BUSINESSES_REQUEST } from '@types/oem';
import OemBusinessSelect from '@components/OemBusinessSelect';

export default ({client,defaultValue}) => {
  const dispatch = useDispatch();
  const oem_businesses = useSelector(({oems}) => oems.byId[client] && oems.byId[client].oem_businesses)
  useEffect(() => {
    if(!oem_businesses){
      dispatch({type: FETCH_OEM_BUSINESSES_REQUEST, payload: {url: `/oems/${client}/oem_businesses`, id: client}})
    }
  },[oem_businesses,client])
  return <OemBusinessSelect oem_businesses={oem_businesses} defaultValue={defaultValue} />
}
