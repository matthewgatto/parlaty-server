import React from 'react';
import PolygonGroup from '@components/SVG/PolygonGroup';
import styles from './index.module.css';

export default ({className,text}) => (
  <div className={className ? `${styles.container} ${className}` : styles.container}>
  <PolygonGroup className={styles.polygon} />
  <div className={styles.text}>Loading{text && ` ${text}`}...</div>
  </div>
)
