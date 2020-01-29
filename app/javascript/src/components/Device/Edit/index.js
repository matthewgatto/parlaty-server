import React,{useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import DeviceForm from '../Form';
import { UPDATE_DEVICE_REQUEST } from '../../../redux/types/device';
import { loadActionForms } from '../../../redux/actions/action';
import {getDeviceById} from '../../../redux/selectors/device';

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
