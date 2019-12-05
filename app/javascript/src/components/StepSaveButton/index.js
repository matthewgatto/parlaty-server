import React from 'react';
import Loader from '../Loader';
import styles from './index.module.css';

export default function({isProcessing, ...props}){
  return(
    <div {...props} className={styles.container}>
      {isProcessing ? <Loader fill="#fff" /> : <div className={styles.label}>Save</div>}
    </div>
  )
}
