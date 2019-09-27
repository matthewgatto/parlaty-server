import React from 'react';
import Text from '../Text';
import Triangle from '../Triangle';
import styles from './index.module.css';

const Select = ({options, ...props}) =>
    <div className={styles.container}>
      <select className={styles.select} {...props}>
          {options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
      <Triangle className={styles.icon} />
    </div>


export default Select;
