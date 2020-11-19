import React from 'react';
import styles from './index.module.css';
import activeModal from '@containers/activeModal';

export default activeModal(({modalData}) => (
  <video key={modalData} className={styles.container} autoPlay controls >
    <source src={modalData} type="video/mp4" />
  </video>
), "video_preview")