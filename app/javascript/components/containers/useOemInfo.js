import React,{useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { getOemById } from '@selectors/oem';
import { FETCH_OEM_BUSINESSES_REQUEST } from '@types/oem';

export default (oem_id) => {
  const dispatch = useDispatch();
  const oem = useSelector(getOemById(oem_id));
  useEffect(() => {
    if(!oem && oem_id){
      dispatch({type: FETCH_OEM_BUSINESSES_REQUEST, payload: {url: `/oems/${oem_id}/oem_businesses`}})
    }
  },[oem])

  return oem;
}
