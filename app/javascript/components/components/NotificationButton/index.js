import React from 'react';
import Loader from '../Loader';
import styles from './index.module.css';

const makeButtonClass = (secondary, className) => {
  const str = secondary ? "primary button align_center light" : "primary button align_center";
  return className ? `${str} ${className}` : str
}

export default ({isProcessing, label, onClick, secondary, className, notifications}) => (<>
  <button className={`${makeButtonClass(secondary, className)} ${notifications.disabled ? styles.disabled : null}`} onClick={onClick}>
    {isProcessing ? (
      <Loader fill={secondary ? "#67328d" : "#fff"} />
    ) : (
      label
    )}
  </button>
    <span className={styles.badge}>{
      notifications.info
    }</span>
  </>
)
