import React from 'react';
import styles from './index.module.css';

export default ({labelCounter, children}) => (
    <div className={styles.container}>
      <div className={styles.header}>{children}</div>
      { labelCounter ? (<div className={styles.headerCount}>{labelCounter}</div>) : null }
    </div>
)
