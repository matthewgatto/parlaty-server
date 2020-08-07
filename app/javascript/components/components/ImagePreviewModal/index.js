import React from 'react';
import withModal from '@containers/withModal';
import styles from './index.module.css';

export default withModal(({modalData}) => (
  <div className={styles.wrapper}>
    <img src={modalData} className={styles.container} />
  </div>
), "image_preview")
