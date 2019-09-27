import React from 'react';
import Well from '../Well';
import Text from '../Text';
import styles from './index.module.css';

const ActionWell = ({text, className, leftIcon, rightIcon, ...rest}) =>
  <Well color="primary" className={className ? styles.container+" "+className : styles.container} {...rest}>
    {leftIcon && leftIcon}
    <Text color="primary" className={styles.grow}>{text}</Text>
    {rightIcon && rightIcon}
  </Well>

export default ActionWell;
