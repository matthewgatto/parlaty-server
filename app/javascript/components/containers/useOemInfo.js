import React,{useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { getOemById } from '@selectors/oem';
import { FETCH_OEM_BUSINESSES_REQUEST } from '@types/oem';

export default (id_oem) => {
  const dispatch = useDispatch();
  const oem = useSelector(getOemById(id_oem));
  useEffect(() => {
    if(!oem){
      dispatch({type: FETCH_OEM_BUSINESSES_REQUEST, payload: {url: `/oems/${id_oem}/oem_businesses`}})
    }
  },[oem])

  return oem;
}
