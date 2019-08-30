import React from 'react';
import styles from './index.module.css';

const CheckBox = ({label, value, ...props}) =>
  <div className={styles.container}>
    <input checked={value} type="checkbox" className={styles.input} {...props} />
    {label && <span className={styles.label}>{label}</span>}
  </div>

export default CheckBox;
