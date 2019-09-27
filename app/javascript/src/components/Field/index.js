import React from 'react';
import Text from '../Text';
import Error from '../Error';
import styles from './index.module.css';

const Field = ({label, color, error, children}) =>
  <div className={styles.container}>
    {label &&
      <Text className={styles.label} color={color}>
        {label}
        <Error className={styles.error} error={error ? "This field is required" : undefined} />
      </Text>
    }
    {children}
  </div>

export default Field;
