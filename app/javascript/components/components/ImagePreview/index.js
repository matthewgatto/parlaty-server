import React from 'react';
import styles from './index.module.css';

export default ({modalData}) => (
  <img src={modalData} className={styles.container} />
)
