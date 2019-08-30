import React from 'react';
import styles from './index.module.css';

const Placeholder = ({text, icon}) =>
  <div className={styles.empty}>
    <div className={styles.text}>{text}</div>
  </div>

export default Placeholder;
