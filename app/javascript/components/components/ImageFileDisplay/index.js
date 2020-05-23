import React from 'react';
import withFileLoader from '@containers/withFileLoader';
import styles from './index.module.css';

const ImageDisplay = withFileLoader(({isLoading,...props}) => (
  <img {...props} className={isLoading ? `${styles.image} ${styles.hide}` : styles.image} />
),"image_preview")
export default ({src,setModal,setFile}) => (
  <div className={styles.container}>
    {src ? (
      <ImageDisplay src={src} setModal={setModal} />
    ) : (
      <div onClick={setFile} className={styles.placeholder}>No File Uploaded</div>
    )}
  </div>
)
