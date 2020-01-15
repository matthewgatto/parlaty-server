import React from 'react';
import Bar from '../../Bar/Small';
import Add from '../../SVG/Add';
import styles from './index.module.css';

export default ({addIcon, ...props}) => (
  <Bar
    left={addIcon && <Add className={styles.icon} />}
    {...props}
  />
)
