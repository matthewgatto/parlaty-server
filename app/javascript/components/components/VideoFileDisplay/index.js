import React from 'react';
import styles from './index.module.css';

export default ({ isLoading, onLoad,...props }) => (
  <div className={styles.container}>
    <video {...props} onCanPlay={onLoad} className={isLoading ? `${styles.image} ${styles.hide}` : styles.image} />
  </div>
)