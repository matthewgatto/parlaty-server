import React from 'react';
import ActionBar from '../ActionBar';
import Add from '../SVG/Add';
import styles from './index.module.css';

const AddButton = ({text, ...rest}) =>
  <ActionBar
    color
    text={text}
    leftIcon={<Add className={styles.icon} />}
    {...rest}
  />

export default AddButton;
