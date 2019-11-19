import React from 'react';
import styles from './index.module.css';

export default function(props){
  return(
    <div {...props} className={styles.container}><div className={styles.label}>Save</div></div>
  )
}
