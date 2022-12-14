import React from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {getProcedureById} from '@selectors/procedure';
import {getDeviceById} from '@selectors/device';
import { setModal } from '@actions/modal';
import styles from './index.module.css';

const DeviceItem = ({deviceId}) => {
  const device = useSelector(getDeviceById(deviceId));
  if(device.parent_id > 0) {
    return false;
  }
  const name = `${device.machine_tag ? `${device.machine_tag} - ` : ""}${device.name}`;
  const dispatch = useDispatch();
  const handleClick = () => dispatch(setModal("update_device", deviceId));
  return <div onClick={handleClick} className={styles.device}>{name}</div>
};
const DeviceSelectComponent = ({devices}) => {
  const hasDevices = devices && devices.length > 0;
  return(
    <div className={styles.container}>
      {hasDevices ? (
        devices.map(deviceId => <DeviceItem key={deviceId} deviceId={deviceId} />)
      ) : (
        <span className={styles.placeholder}>No Procedure Devices</span>
      )}
    </div>
  )
};

export default ({procedure_id}) => {
  const {devices} = useSelector(getProcedureById(procedure_id));
  return <DeviceSelectComponent devices={devices} />
}
