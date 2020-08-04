import React from 'react';
import withFileLoader from '@containers/withFileLoader';
import styles from './index.module.css';

const Video = withFileLoader(({isLoading, onLoad,...props}) => (
  <video {...props} onCanPlay={onLoad} className={isLoading ? `${styles.image} ${styles.hide}` : styles.image} />
), "video_preview");
export default ({src,setModal,setFile, isArrParams}) => (
  <div className={styles.container}>
    {src ? (
      <Video src={src} setModal={setModal} isArrParams={isArrParams} />
    ) : (
      <div onClick={setFile} className={styles.placeholder}>No File Uploaded</div>
    )}
  </div>
)
