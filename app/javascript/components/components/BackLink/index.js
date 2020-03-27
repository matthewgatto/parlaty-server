import React from 'react';
import { Link } from 'react-router-dom';
import Triangle from '@components/SVG/Triangle';
import styles from './index.module.css';

export default ({to, children, className}) => (
  <Link className={className ? `${styles.container} ${className}` : styles.container} to={to}><Triangle className={styles.triangle} /> {children}</Link>
)
