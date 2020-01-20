import React from 'react';
import useImageLoader from '../useImageLoader';
import styles from './index.module.css';

export default ({src}) => {
  const isLoading = useImageLoader(src)
  return <div className={isLoading ? `${styles.container} ${styles.hide}` : styles.container} style={isLoading ? undefined : {backgroundImage: `url(${src})`}}  />
}
