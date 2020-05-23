import React from 'react';
import withModal from '@containers/withModal';
import styles from './index.module.css';

export default withModal(({modalData}) => (
  <video src={modalData} className={styles.container} autoPlay />
), "video_preview")
