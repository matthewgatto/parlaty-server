import React from 'react';
import styles from './index.module.css';

const Radio = ({label, ...props}) =>
  <div className={styles.container}>
    <input type="radio" className={styles.input} {...props} />
    {label && <span className={styles.label}>{label}</span>}
  </div>

export default Radio;
