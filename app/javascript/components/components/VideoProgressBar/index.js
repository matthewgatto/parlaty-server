import React from 'react';
import styles from './index.module.css';

export default ({percent}) => (
  <div className={styles.container}>
    <div className={styles.bar} style={{width: `${percent}%`}} />
  </div>
)
