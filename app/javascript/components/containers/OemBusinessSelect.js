import React,{useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { FETCH_OEM_BUSINESSES_REQUEST } from '@types/oem';
import OemBusinessSelect from '@components/OemBusinessSelect';
import { getOemBusinesses } from '@selectors/oem';

export default ({client,defaultValue}) => {
  const dispatch = useDispatch();
  const oem_businesses = useSelector(getOemBusinesses(client))
  useEffect(() => {
    if(!oem_businesses && client){
      dispatch({type: FETCH_OEM_BUSINESSES_REQUEST, payload: {url: `/oems/${client}/oem_businesses`, id: client}})
    }
  },[oem_businesses,client])
  return <OemBusinessSelect oemBusinesses={oem_businesses} defaultValue={defaultValue} />
}
