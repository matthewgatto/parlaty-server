import React from 'react';
import styles from './index.module.css';
import activeModal from '@containers/activeModal';

export default activeModal(({modalData}) => (
  <div className={styles.wrapper}>
    <img src={modalData} className={styles.container} />
  </div>
), "image_preview")
