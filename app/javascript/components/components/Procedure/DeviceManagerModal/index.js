import React from 'react';
import Bar from '@components/Bar/Large';
import DeviceManager from '../DeviceManager';
import activeModal from '@containers/activeModal';
import styles from './index.module.css';

export default activeModal(({procedure_id,name}) => (
  <div className={styles.container}>
    <Bar title={`Manage ${name ? name : "Procedure"} Devices`} className={styles.modalHeader} />
    <DeviceManager procedure_id={procedure_id} />
  </div>
), "manage_devices")
