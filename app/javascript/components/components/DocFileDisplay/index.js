import React from 'react';
import withFileLoader from '@containers/withFileLoader';
import styles from './index.module.css';

const DocDisplay = withFileLoader(({ isLoading, params }) => (
  <div className={isLoading ? `${styles.doc} ${styles.hide}` : styles.doc}>
    {params.type && params.name.split('.').pop()}
    </div>
),"doc_preview");

export default ({src,setModal,setFile}) => (
  <div className={styles.container}>
    {src ? (
      <DocDisplay src={src} setModal={setModal} />
    ) : (
      <div onClick={setFile} className={styles.placeholder}>No File Uploaded</div>
    )}
  </div>
)
