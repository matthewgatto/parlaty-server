import React from 'react';
import styles from './index.module.css';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';

export default ({onClick, hasNewMess, hasComments, ...props}) =>
  <>
    {hasComments ? (
      <div onClick={onClick} className={styles.iconWrapper}>
        <ChatBubbleOutlineIcon className={styles.icon}/>
        {hasNewMess ? <ErrorOutlineIcon className={styles.indicate} fontSize="small" /> : null}
      </div>)
      : null
    }
  </>