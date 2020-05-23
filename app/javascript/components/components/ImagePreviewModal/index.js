import React from 'react';
import withModal from '@containers/withModal';
import styles from './index.module.css';

export default withModal(({modalData}) => (
  <img src={modalData} className={styles.container} />
), "image_preview")
