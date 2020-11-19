import React from 'react';
import styles from './index.module.css';
import AudiotrackRoundedIcon from '@material-ui/icons/AudiotrackRounded';

export default ({ isLoading, onLoad, ...props }) => (
  <div className={styles.container} >
    <div {...props} className={styles.icon}>
      <AudiotrackRoundedIcon fontSize="small" />
    </div>
  </div>
)