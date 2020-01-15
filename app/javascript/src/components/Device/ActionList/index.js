import React from 'react';
import styles from './index.module.css';

export default ({actions}) => (
  <div className={styles.container}>
    {(actions && actions.length > 0) ? (
      actions.map((action, i) => (
        <div className="align_center" key={i}>
          <div className={styles.number}>{i+1}.</div>
          <div className={styles.text}>{action}</div>
        </div>
      ))
    ) : (
      <div>No actions</div>
    )}
  </div>
)
