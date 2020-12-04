import React, { useEffect, useState, useCallback } from 'react';
import styles from './index.module.css';
import activeModal from '@containers/activeModal';
import FileViewer from 'react-file-viewer';

export default activeModal(({modalData, modalType}) => {
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  useEffect(() => {
    setTimeout(() => forceUpdate(), 1);
  }, []);
  return (
    <div className={styles.container}>
       <FileViewer
         key={modalData + Math.random().toString()}
         fileType={modalType}
         filePath={~modalData.indexOf('data:') ? `${modalData}` : modalData}
       />
     </div>
)}, "doc_preview")
