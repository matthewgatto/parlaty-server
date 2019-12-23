import React from 'react';

import styles from './index.module.css';

export default function({image, isLoading, error, onLoad, setImageRef, onClick}){
  return(
    <div className={styles.container}>
      {image.src &&
        <img className={isLoading ? `${styles.image} ${styles.hide}` : styles.image} ref={setImageRef} onLoad={onLoad} src={image.src}  />
      }
      {(isLoading || !image || !image.src) ? <div className={styles.loading}><div>Loading</div></div> : null}
      <div onClick={onClick} className={styles.iconWrapper}>
        <svg className={styles.icon} fill="#fff" width="1em" height="1em" viewBox="0 0 24 24">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      </div>
    </div>
  )
}
