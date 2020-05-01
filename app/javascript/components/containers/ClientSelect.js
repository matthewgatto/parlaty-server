import React,{useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {Select} from '@components/Inputs';
import { FETCH_OEMS_REQUEST } from '@types/oem';

export default ({formKey, defaultValue, hidden}) => {
  const dispatch = useDispatch();
  const clients = useSelector(({oems}) => oems.allIds && oems.allIds.map(id => ({value: id, label: oems.byId[id].name})))
  useEffect(() => {
    if(!clients){
      dispatch({type: FETCH_OEMS_REQUEST, payload: {url: '/oems'}})
    }
  },[]);
  return(
    <Select defaultValue={defaultValue} options={clients || []} label="Client*" name="client" formKey={formKey} placeholder="Choose a client..." unclearable hidden={hidden}  />
  )
}
