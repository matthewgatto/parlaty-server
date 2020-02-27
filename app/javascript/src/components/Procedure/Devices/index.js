import React from 'react';
import {useSelector} from 'react-redux';
import {getProcedureDevices} from '@selectors/device';
import styles from './index.module.css';

const DeviceSelectComponent = ({devices}) => {
  const hasDevices = devices && devices.length > 0
  return(
    <div className={styles.container}>
      {hasDevices ? (
        devices.map(({id, name}) => <div key={id}>{name}</div>)
      ) : (
        <div className={styles.placeholder}>No procedure devices</div>
      )}
    </div>
  )
}

export default ({procedure_id}) => {
  const devices = useSelector(getProcedureDevices(procedure_id));
  console.log("devices", devices);
  return <DeviceSelectComponent devices={devices} />
}
