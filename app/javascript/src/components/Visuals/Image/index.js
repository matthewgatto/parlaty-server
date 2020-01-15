import React from 'react';
import useImageLoader from '../useImageLoader';
import styles from './index.module.css';

export default ({src}) => {
  const {isLoading,onLoad} = useImageLoader(src)
  return <img className={isLoading ? `${styles.container} ${styles.hide}` : styles.container} onLoad={src.complete ? undefined : onLoad} src={src}  />
}
