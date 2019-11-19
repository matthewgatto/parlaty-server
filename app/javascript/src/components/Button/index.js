import React from 'react';
import Loader from '../Loader';
import styles from './index.module.css';

const Button = ({text, className, isLoading, ...rest}) =>
  <button type="submit" className={className ? styles.container+" "+className : styles.container}>
    {isLoading ? <Loader fill="#fff" /> : text}
  </button>

export default Button;
