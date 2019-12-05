import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.css';

export default function (props){
  if (props.name) {
    return(
      <Link to={props.to} className={styles.container}>
        <div className={styles.text}>{props.name}</div>
      </Link>
    )
  }
  return null;
}
