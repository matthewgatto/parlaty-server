import React from 'react';
import styles from './index.module.css';

export default function({text}){
  return(
    <div className={styles.container}>{text}</div>
  )
}
