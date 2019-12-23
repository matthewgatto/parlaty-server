import React from 'react';
import { Transition } from 'react-transition-group';
import styles from './index.module.css';

export default function(props){
  var className = styles.error;
  if(props.large) className = `${className} ${styles.large}`
  if(props.top) className = `${className} ${styles.top}`
  if(props.className) className = `${className} ${props.className}`
  return(
    <Transition in={props.error ? true : false} timeout={150}>
      {state => (
        <span className={`${className} ${styles[state]}`}>{props.error}</span>
      )}
    </Transition>
  )
}
