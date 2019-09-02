import React from 'react';
import Loader from '../Loader';
import styles from './index.module.css';

const Button = ({text, className, isLoading, ...rest}) =>
  <div className={className ? styles.container+" "+className : styles.container} {...rest}>
    {isLoading ? <Loader fill="#fff" /> : text}
  </div>

export default Button;
