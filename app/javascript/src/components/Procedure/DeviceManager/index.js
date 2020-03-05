import React from 'react';
import ModalTrigger from '@containers/ModalTrigger';
import ProcedureDevices from '../Devices';
import styles from './index.module.css';

export default ({procedure_id}) => (<>
  <ProcedureDevices procedure_id={procedure_id} />
  <div className={styles.buttonRow}>
    <ModalTrigger modal="procedure_device_list" className={styles.button}>Copy A Device</ModalTrigger>
    <div className={styles.or}>- or -</div>
    <ModalTrigger modal="create_device" className={styles.button}>Create A New Device</ModalTrigger>
  </div>
</>)
