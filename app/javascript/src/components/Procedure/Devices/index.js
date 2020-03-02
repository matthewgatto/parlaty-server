import React from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {getProcedureById} from '@selectors/procedure';
import {getDeviceById} from '@selectors/device';
import { setModal } from '@actions/modal';
import styles from './index.module.css';

const DeviceItem = ({deviceId}) => {
  const {name} = useSelector(getDeviceById(deviceId));
  const dispatch = useDispatch()
  const handleDoubleClick = () => dispatch(setModal("update_device", deviceId))
  return <div onDoubleClick={handleDoubleClick} className={styles.device}>{name}</div>
}
const DeviceSelectComponent = ({devices}) => {
  const hasDevices = devices && devices.length > 0
  return(
    <div className={styles.container}>
      {hasDevices ? (
        devices.map(deviceId => <DeviceItem key={deviceId} deviceId={deviceId} />)
      ) : (
        <div className={styles.placeholder}>No Procedure Devices</div>
      )}
    </div>
  )
}

export default ({procedure_id}) => {
  const {devices} = useSelector(getProcedureById(procedure_id));
  return <DeviceSelectComponent devices={devices} />
}
