import React from 'react';
import ModalTrigger from '@containers/ModalTrigger';
import ModalList from '@components/ModalList';
import CloseIcon from '@components/SVG/Close';
import styles from './index.module.css';

export default ({params, children}) =>  (
  <div className={styles.container}>
    <div className={styles.content}>
      <ModalTrigger className={styles.closeButton}><CloseIcon className={styles.closeIcon} /></ModalTrigger>
      <div className={styles.window}>
        <div className={styles.contain}>{children}</div>
        {params && <ModalList params={params} />}
      </div>
    </div>
  </div>
)
