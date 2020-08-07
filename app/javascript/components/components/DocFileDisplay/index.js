import React from 'react';
import styles from './index.module.css';

export default ({isLoading, params, className, ...props}) => (
  <div className={styles.container}>
    <div {...props} className={`${styles.doc} ${className || ''}`}>
      {params && (params.name || params.visual).split('.').pop()}
    </div>
  </div>
)