import React from 'react';
import styles from './index.module.css';

export default ({ isLoading, onLoad, src, ...props }) => (
  <div className={styles.container}>
    <video {...props} onCanPlay={onLoad} className={isLoading ? `${styles.image} ${styles.hide}` : styles.image} >
      <source src={src} type="video/mp4" />
    </video>
  </div>
)