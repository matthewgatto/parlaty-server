import React from 'react';
import PolygonGroup from '@components/SVG/PolygonGroup';
import styles from './index.module.css';

export default function(props){
  return(
    <div className={styles.container}>
    <PolygonGroup className={styles.polygon} />
    <div className={styles.text}>Loading{props.text && ` ${props.text}`}...</div>
    </div>
  )
}
