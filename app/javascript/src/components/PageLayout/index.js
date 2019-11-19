import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.css';

export default function(props){
  return(
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.title}>{props.header}</span>
        {props.link && <Link className={styles.link} to={props.link.to}>{props.link.text}</Link>}
      </div>
      {props.error ? (
        <div>{props.error}</div>
      ) : props.isLoading ? (
        <div>Loading...</div>
      ) : props.children}
    </div>
  )

  /*
  return(
    <div className={styles.container}>
      <h1>{props.header}</h1>
      {props.children}
    </div>
  )
  */
}
