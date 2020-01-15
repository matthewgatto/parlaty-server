import React from 'react';
import styles from './index.module.css';

export default ({text, color, left, right, setRef, ...props}) => (
  <div ref={setRef} className={color ? `${styles.container} align_center ${styles.color}` : `${styles.container} align_center`} {...props}>
    {left}
    <div className={styles.text}>{text}</div>
    {right}
  </div>
)
