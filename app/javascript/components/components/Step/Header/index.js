import React from 'react';
import Bar from '../Bar';
import StepMenu from '@containers/StepMenu';
import styles from './index.module.css';
import {useSelector} from "react-redux";
import {getDeviceById} from '@selectors/device';
import CommentsShowButton from '@containers/CommentsShowButton'

const DeviceDisplay = ({deviceId}) => {
  if(!deviceId){
    return "None";
  }else {
    const device = useSelector(getDeviceById(deviceId));
    const deviceName = device && device.name || "None";
    return deviceName;
  }
}

export default ({id, idx, title, looped, root, duplicateStep, isOpen, deviceId, isDuplicate, isDragging, deleteStep, comments, hasNewComments, ...props}) => (
  <Bar
    {...props}
    color={isOpen || isDragging}
    text={<><div>{title + looped}</div><div className={styles.device}>Device: <span className={styles.purple}><DeviceDisplay deviceId={deviceId} /></span></div></>}
    addIcon={isDuplicate}
    right={<div className={styles.rightDiv}>
      {!isDuplicate && <CommentsShowButton id={id} title={title} comments={comments} hasNewComments={hasNewComments} {...props} />}
      {!isDuplicate && <StepMenu idx={idx} duplicateStep={duplicateStep} deleteStep={deleteStep} />}
    </div>
    }
  />
)
