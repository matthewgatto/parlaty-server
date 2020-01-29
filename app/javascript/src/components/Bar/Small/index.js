import React from 'react';
import styles from './index.module.css';

const makeSmallBarClass = (color, className, onClick) => {
  var classStr = `${styles.container} align_center`;
  if(color) classStr = `${classStr} ${styles.color}`;
  if(onClick) classStr = `${classStr} ${styles.pointer}`;
  if(className) classStr = `${classStr} ${className}`;
  return classStr
}
export default ({text, color, left, right, setRef, className, onClick, ...props}) => (
  <div ref={setRef} className={makeSmallBarClass(color, className, onClick)} onClick={onClick} {...props}>
    {left}
    <div className={styles.text}>{text}</div>
    {right}
  </div>
)
