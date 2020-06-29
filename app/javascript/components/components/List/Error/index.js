import React from 'react';
import styles from './index.module.css';

export default function(props){
  return(
    <div className={styles.container}>
      <div className={styles.error}>{props.error}</div>
      <button className="primary button align_center" onClick={props.retry}>Try again</button>
    </div>
  )
}
