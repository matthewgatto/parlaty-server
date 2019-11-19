import React from 'react';
import Loader from '../Loader';
import styles from './index.module.css';

export default function(props){
  return(
    <button type="submit" className={styles.container}>
      {props.isLoading ? <Loader fill="#67328d" /> : props.label}
    </button>
  )
}
