import React from 'react';
import withModal from '@containers/withModal';
import styles from './index.module.css';

export default withModal(({modalData}) => {return (
  <div className={styles.container}>
    <div>
      {modalData && typeof modalData === "string" ? 'file' : (modalData.name || modalData).split('.').pop() || 'file'}
    </div>
  </div>
)}, "doc_preview")
