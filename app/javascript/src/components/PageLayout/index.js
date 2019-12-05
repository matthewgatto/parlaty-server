import React from 'react';
import { Link } from 'react-router-dom';
import Triangle from '../SVG/Triangle';
import styles from './index.module.css';

export default function(props){
  if(props.isLoading){
    return(
      <div className={styles.container}>
        <div className={styles.header}>
        </div>
        <div className={styles.loadingContent}>
        </div>
      </div>
    )
  }
  return(
    <div className={styles.container}>
      {props.back &&
        <Link className={styles.back} to={props.back.to}><Triangle className={styles.triangle} /> {props.back.label}</Link>
      }
      <div className={styles.header}>
        <span className={styles.title}>{props.header}</span>
        {props.link && <Link className={styles.link} to={props.link.to}>{props.link.text}</Link>}
      </div>
      {props.children}
    </div>
  )
}
