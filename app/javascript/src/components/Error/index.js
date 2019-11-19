import React from 'react';
import { Transition } from 'react-transition-group';
import styles from './index.module.css';

const Error = ({error, className}) =>
  <Transition in={error ? true : false} timeout={150}>
    {state => (
      <span className={className ? `${styles.error} ${className} ${styles[state]}` : `${styles.error} ${styles[state]}`}>{error}</span>
    )}
  </Transition>

export default Error;
