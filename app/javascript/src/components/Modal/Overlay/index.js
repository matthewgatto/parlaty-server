import React from 'react';
import ModalTrigger from '@containers/ModalTrigger';
import CloseIcon from '@components/SVG/Close';
import styles from './index.module.css';

export default ({children}) => (
  <div className={styles.container}>
    <div className={styles.content}>
      <ModalTrigger className={styles.closeButton}><CloseIcon className={styles.closeIcon} /></ModalTrigger>
      {children}
    </div>
  </div>
)
