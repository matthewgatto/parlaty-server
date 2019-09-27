import React from 'react';
import Text from '../Text';
import styles from './index.module.css';

const CheckBox = ({label, value, ...props}) =>
  <div className={styles.container}>
    <input checked={value} type="checkbox" className={styles.input} {...props} />
    {label && <Text>{label}</Text>}
  </div>

export default CheckBox;
