import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.css';

export default ({name,to}) => name ? (
  <Link to={to} className={styles.container}>
    <div className={styles.text}>{name}</div>
  </Link>
) : null
