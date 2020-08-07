import React from "react";
import {useSelector} from "react-redux";
import {getMessage} from '@selectors/message';
import styles from './index.module.css';

export default () => {
  const message = useSelector(getMessage);
  return(
    <div className={styles.container}>
      <div className={styles.message}>
        {message.message || "No messages"}
      </div>
    </div>
  )
}