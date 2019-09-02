import React from 'react';
import Text from '../Text';
import styles from './index.module.css';

const Radio = ({label, ...props}) =>
  <div className={styles.container}>
    <input type="radio" className={styles.input} {...props} />
    {label && <Text>{label}</Text>}
  </div>

export default Radio;
