import React from 'react';
import Bar from '../Bar';
import StepMenu from '@containers/StepMenu';
import styles from './index.module.css';
import {useSelector} from "react-redux";
import {getDeviceById} from '@selectors/device';

const DeviceDisplay = ({deviceId}) => {
  if(!deviceId){
    return "None";
  }else {
    const device = useSelector(getDeviceById(deviceId));
    const deviceName = device && device.name || "None";
    return deviceName;
  }
}

export default ({idx, title, root, duplicateStep, isOpen, deviceId, isDuplicate, isDragging, deleteStep, ...props}) => (
  <Bar
    {...props}
    color={isOpen || isDragging}
    text={<><div>{title}</div><div className={styles.device}>Device: <span className={styles.purple}><DeviceDisplay deviceId={deviceId} /></span></div></>}
    addIcon={isDuplicate}
    right={!isDuplicate && <StepMenu idx={idx} duplicateStep={duplicateStep} deleteStep={deleteStep} />}
  />
)
