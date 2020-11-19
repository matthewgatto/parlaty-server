import React from 'react';
import ModalTrigger from '@containers/ModalTrigger';
import ProcedureDevices from '../Devices';
import styles from './index.module.css';

export default ({procedure_id}) => (<>
  <ProcedureDevices procedure_id={procedure_id} />
  <div className={styles.buttonRow}>
    <ModalTrigger modal="procedure_device_list" className="primary button align_center">Copy A Device</ModalTrigger>
    <span className={styles.or}>- or -</span>
    <ModalTrigger modal="create_device" className="primary button align_center">Create A New Device</ModalTrigger>
  </div>
</>)
