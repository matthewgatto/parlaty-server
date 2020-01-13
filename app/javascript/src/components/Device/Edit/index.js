import React,{useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import DeviceForm from '../Form';
import { UPDATE_DEVICE_REQUEST } from '../../../redux/types/device';
import { loadDeviceActions } from '../../../redux/actions/device';
import uuid from 'uuid/v4';

export default ({history:{goBack},match:{params:{id}}}) => {
  const initialValues = useSelector(({devices:{byId:{[id]:device}}}) => device);
  const dispatch = useDispatch();
  useEffect(() => {
    if(initialValues.actions && initialValues.actions.length > 0){
      dispatch(loadDeviceActions(initialValues.actions.map(i => uuid())))
    }
  }, [])
  return(
    <DeviceForm
      header="Update Device"
      url={`/devices/${id}`}
      type={UPDATE_DEVICE_REQUEST}
      initialValues={initialValues}
      id={id}
      goBack={goBack}
      device_id={id}
    />
  )
}
