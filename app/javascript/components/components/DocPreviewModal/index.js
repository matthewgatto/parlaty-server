import React from 'react';
import styles from './index.module.css';
import activeModal from '@containers/activeModal';

export default activeModal(({modalData}) => {return (
  <div className={styles.container}>
    <div>
      {modalData && typeof modalData === "string" ? 'file' : (modalData.name || modalData).split('.').pop() || 'file'}
    </div>
  </div>
)}, "doc_preview")
