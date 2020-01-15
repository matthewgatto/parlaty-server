import React from 'react';
import styles from './index.module.css';

export const Text = ({children}) => (
  <div className={styles.text}>{children}</div>
)
export default ({children, light, ...props}) => (
  <div className={light ? `${styles.container} align_center ${styles.light}` : `${styles.container} align_center`} {...props}>
    {children}
  </div>
)
