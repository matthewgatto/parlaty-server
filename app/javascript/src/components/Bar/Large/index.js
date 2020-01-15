import React from 'react';
import styles from './index.module.css';

export default ({title, right}) => (
  <div className={`${styles.container} align_center`}>
    <span className={styles.title}>{title}</span>
    {right}
  </div>
)
