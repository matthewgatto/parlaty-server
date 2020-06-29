import React from 'react';
import Polygon from '../PolygonV';
import styles from './index.module.css';

export default function(props){
  return(
    <div className={`${styles.container} ${props.className}`}>
      <Polygon className={styles.one} fill="#c6c6c6" stroke="#c6c6c6" size="2.4em" />
      <Polygon className={styles.two} fill="#67318d" stroke="#67318d" size="1.2em" />
      <Polygon className={styles.three} fill="none" stroke="#67318d" size="2.5em" />
      <Polygon className={styles.four} fill="#ccbbd7" stroke="#ccbbd7" size="1.2em" />
    </div>
  )
}
