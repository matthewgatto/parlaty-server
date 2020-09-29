import React from 'react';
import styles from './index.module.css';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';

export default ({onClick, has_new_comments, hasComments, ...props}) =>
  <>
    {hasComments ? (
      <div onClick={onClick} className={styles.iconWrapper}>
        <ChatBubbleOutlineIcon className={styles.icon}/>
        {has_new_comments ? <ErrorOutlineIcon className={styles.indicate} fontSize="small" /> : null}
      </div>)
      : null
    }
  </>