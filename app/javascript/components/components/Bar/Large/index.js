import React from 'react';
import styles from './index.module.css';

export default ({title, right, className}) => (
  <div className={className ? `${styles.container} ${className} align_center` : `${styles.container} align_center`}>
    <span className={styles.title}>{title}</span>
    {right && <div className={styles.right}>{right}</div>}
  </div>
)
