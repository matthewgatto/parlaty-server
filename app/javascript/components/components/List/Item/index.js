import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.css';

export const ListItemText = ({children}) => <div className={styles.text}>{children}</div>

export const ListItemContainer = ({to, children}) => (
  <Link to={to} className={styles.container}>
    {children}
  </Link>
)

export default ({name,to}) => name ? (
  <ListItemContainer to={to}>
    <ListItemText>{name}</ListItemText>
  </ListItemContainer>
) : null
