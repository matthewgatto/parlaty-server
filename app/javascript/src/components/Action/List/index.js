import React from 'react';
import Action from '../Item';
import styles from './index.module.css';

export default ({actions}) => (
  <div className={styles.container}>
    {(actions && actions.length > 0) ? (
      actions.map((id, i) => <Action key={id} id={id} position={i+1} />)
    ) : (
      <div>No actions</div>
    )}
  </div>
)
