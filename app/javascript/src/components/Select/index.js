import React from 'react';
import Text from '../Text';
import styles from './index.module.css';

const Select = ({options, ...props}) =>
    <select className={styles.select} {...props}>
        {options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
    </select>

export default Select;
