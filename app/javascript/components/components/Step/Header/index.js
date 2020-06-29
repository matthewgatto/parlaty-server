import React from 'react';
import {useSelector} from 'react-redux'
import { useFormContext } from "react-hook-form";
import Bar from '../Bar';
import StepMenu from '@containers/StepMenu';
import styles from './index.module.css';

const DeviceName = ({id}) => {
  const name = useSelector(({devices}) => devices.byId[id] && devices.byId[id].name);
  return name || "None"
}
const DeviceDisplay = ({root}) => {
  const {watch} = useFormContext();
  const device = watch(`${root}device_id`);
  if(!device){
    return "None"
  }
  return <DeviceName id={device} />
}

export default ({idx, title, root, duplicateStep, isOpen, isDuplicate, isDragging, deleteStep, ...props}) => (
  <Bar
    {...props}
    color={isOpen || isDragging}
    text={<><div>{title}</div><div className={styles.device}>Device: <span className={styles.purple}><DeviceDisplay root={root} /></span></div></>}
    addIcon={isDuplicate}
    right={!isDuplicate && <StepMenu idx={idx} duplicateStep={duplicateStep} deleteStep={deleteStep} />}
  />
)
