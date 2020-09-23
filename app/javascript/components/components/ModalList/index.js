import React from 'react';
import styles from "./index.module.css";
import { getStepFileList } from '@selectors/template';
import { getActionFileList } from '@selectors/action';
import { useSelector } from "react-redux";
import FileLoader from '@containers/withFileLoader';

export default ({params}) => {
  const {index: activeIndex, idx, objName} = params;
  const files = useSelector(objName === 'step' ? getStepFileList(idx) : objName === 'action' ? getActionFileList(idx): null);
  return(
    <div className={styles.panel}>
      {files && [...files].map((file, i) => (
          <div key={file.id} className={`${styles.fileList} ${activeIndex === i ? styles.activeFile : null}`}>
            <FileLoader file={file} src={file.visual || file} isArrParams={{ index: i, idx, objName, change: true }} />
          </div>
        )
      )}
    </div>
  )
}