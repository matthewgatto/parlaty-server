import React from 'react';
import styles from './index.module.css';
import activeModal from '@containers/activeModal';

export default activeModal(({modalData}) => (
  <video src={modalData} className={styles.container} autoPlay />
), "video_preview")
