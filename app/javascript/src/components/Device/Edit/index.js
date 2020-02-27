import React,{useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import DeviceForm from '../Forms/Page';
import { UPDATE_DEVICE_REQUEST } from '@types/device';
import { loadActionForms } from '@actions/action';
import {getDeviceById} from '@selectors/device';

export default ({match:{params:{id}}}) => {
  const initialValues = useSelector(getDeviceById(id));
  const dispatch = useDispatch();
  useEffect(() => {
    if(initialValues.actions && initialValues.actions.length > 0){
      dispatch(loadActionForms(initialValues.actions))
    }
  }, [])
  return(
    <DeviceForm
      header="Update Device"
      url={`/devices/${id}`}
      type={UPDATE_DEVICE_REQUEST}
      initialValues={initialValues}
      id={id}
      device_id={id}
    />
  )
}
