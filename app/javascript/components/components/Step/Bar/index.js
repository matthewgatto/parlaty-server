import React from 'react';
import Bar from '@components/Bar/Small';
import Add from '@components/SVG/Add';
import styles from './index.module.css';

export default ({addIcon, ...props}) => (
  <Bar
    left={addIcon && <Add className={styles.icon} />}
    {...props}
  />
)
