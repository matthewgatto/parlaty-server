import React from 'react';
import ActionWell from '../ActionWell';
import styles from './index.module.css';

const AddButton = ({text, className, ...rest}) =>
  <ActionWell
    text={text}
    leftIcon={<svg className={styles.icon} viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/><path d="M0 0h24v24H0z" fill="none"/></svg>}
    {...rest}
  />

export default AddButton;
