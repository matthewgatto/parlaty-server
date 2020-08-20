import React from 'react';
import styles from './index.module.css';

export default ({ isLoading,...props }) => {return(
  <div className={styles.container}>
    <img {...props} className={isLoading ? `${styles.image} ${styles.hide}` : styles.image} />
  </div>
)}