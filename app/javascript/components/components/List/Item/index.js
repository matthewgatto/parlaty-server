import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.css';
import CommentsShowButton from '@components/CommentsShowButton';

export const ListItemText = ({children}) => <div className={styles.text}>{children}</div>

export const ListItemContainer = ({to, children}) => (
  <Link to={to} className={styles.container}>
    {children}
  </Link>
)

export default ({name, to, hasComments}) => name ? (
    <ListItemContainer to={to}>
      <ListItemText>{name}</ListItemText>
      {hasComments ? (
        <div className={styles.badge}>
          <CommentsShowButton onClick={null} has_new_comments={hasComments} hasComments={hasComments} />
        </div>) : null}
    </ListItemContainer>
  ) : null
