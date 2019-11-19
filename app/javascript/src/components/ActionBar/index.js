import React from 'react';
import styles from './index.module.css';

export default function({leftIcon, text, rightIcon, setRef, color, ...props}){
  return(
    <div ref={setRef} {...props} className={color ? styles.container+" "+styles.color : styles.container}>
      <div className={styles.content}>
        {leftIcon}
        <div className={styles.text}>{text}</div>
      </div>
      {rightIcon}
    </div>
  )
}
