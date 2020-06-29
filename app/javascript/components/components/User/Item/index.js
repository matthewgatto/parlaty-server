import React from 'react';
import {Link} from 'react-router-dom';
import styles from './index.module.css';

export default ({user}) => (
  <Link className={styles.container} to={`/users/${user.id}`}>
    <div className={styles.first}>
      <div className={styles.label}>Name</div>
      <div className={styles.text}>{user.name}</div>
    </div>
    <div  className={styles.second}>
      <div className={styles.label}>Role</div>
      <div className={styles.text}>{user.roleable}</div>
    </div>
  </Link>
);
