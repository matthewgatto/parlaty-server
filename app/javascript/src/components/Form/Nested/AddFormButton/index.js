import React from 'react';
import Bar from '@components/Bar/Small';
import Add from '@components/SVG/Add';
import styles from './index.module.css';

export default ({onClick, text}) => (
  <Bar
    color
    text={text}
    onClick={onClick}
    left={<Add className={styles.icon} />}
  />
)
