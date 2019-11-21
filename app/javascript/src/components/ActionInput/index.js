import React from 'react';
import Burger from '../SVG/Burger';
import Close from '../SVG/Close';
import {Input} from '../Forms/Inputs';
import styles from './index.module.css';

const ActionInput = ({idx, name, remove, setRef, ...rest}) =>
  <div {...rest} ref={setRef} className={styles.container}>
    <Burger className={styles.burger} width="1.1em" height="1.1em" />
    <div className={styles.text}>{idx + 1}</div>
    <Input type="text" name={name} />
    <Close onClick={() => {remove(idx)}} className={styles.icon} />
  </div>

export default ActionInput;
