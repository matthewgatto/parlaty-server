import React from 'react';
import styles from './index.module.css';
import DescriptionIcon from '@material-ui/icons/Description';

export default ({isLoading, params, className, ...props}) => (
  <div className={styles.container}>
    <div {...props} className={`${styles.doc} ${className || ''}`}>
      <DescriptionIcon className={styles.icon}/>
    </div>
  </div>
)