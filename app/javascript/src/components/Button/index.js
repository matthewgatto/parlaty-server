import React from 'react';
import styles from './index.module.css';

const Button = ({text, className, ...rest}) =>
  <div className={className ? styles.container+" "+className : styles.container} {...rest}>
    {text}
  </div>

export default Button;
