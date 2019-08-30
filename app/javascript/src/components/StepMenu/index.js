import React from 'react';
import styles from './index.module.css';

const StepMenu = ({handleDuplicate, handleDelete}) =>
  <div className={styles.container}>
    <div className={styles.link} onClick={handleDuplicate}>Duplicate</div>
    <div className={styles.link} onClick={handleDelete}>Delete</div>
  </div>

export default StepMenu;
