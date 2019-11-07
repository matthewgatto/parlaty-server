import React from 'react';
import Burger from '../SVG/Burger';
import ActionInputContainer from '../../containers/ActionInput';
import RemoveActionIcon from '../../containers/RemoveActionIcon';
import styles from './index.module.css';

const ActionInput = ({idx, setRef, ...rest}) =>
  <div {...rest} ref={setRef} className={styles.container}>
    <Burger className={styles.burger} width="1.1em" height="1.1em" />
    <div className={styles.text}>{idx + 1}</div>
    <ActionInputContainer idx={idx} />
    <RemoveActionIcon idx={idx} className={styles.icon} />
  </div>

export default ActionInput;
