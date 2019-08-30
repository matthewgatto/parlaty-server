import React from 'react';
import Text from '../Text';
import styles from './index.module.css';

const Field = ({label, color, error, children}) =>
  <div className={styles.container}>
    {label && <Text className={styles.label} color={color}>{label} {error && <span className={styles.error}>This field is required</span>}</Text>}
    {children}
  </div>

export default Field;
