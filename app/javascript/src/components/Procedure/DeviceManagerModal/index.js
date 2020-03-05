import React from 'react';
import Bar from '@components/Bar/Large';
import DeviceManager from '../DeviceManager';
import withModal from '@containers/withModal';
import styles from './index.module.css';

export default withModal(({procedure_id}) => (
  <div className={styles.container}>
    <Bar title="Manage Devices" className={styles.modalHeader} />
    <DeviceManager procedure_id={procedure_id} />
  </div>
), "manage_devices")
