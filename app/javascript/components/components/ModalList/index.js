import React from 'react';
import { setModal } from '@actions/modal';
import { FileInput } from '@components/Inputs';
import { typeFile } from '@utils';
import styles from "./index.module.css";
import { getStepFileList } from '@selectors/step';
import { useSelector } from "react-redux";

export default ({params}) => {
  const {index: activeIndex, idx} = params;
  const files = useSelector(getStepFileList(idx));
  debugger;
  return(
    <div className={styles.panel}>
      {files && [...files].map((file, i) => {
        const type = typeFile(file), DisplayComponent = type[0];
        return (
          <div key={file.id || file.lastModified +  Math.random(10000)} className={`${styles.fileList} ${activeIndex === i ? styles.activeFile : null}`}>
            <DisplayComponent src={file.visual || file} isArrParams={{ index: i, idx, change: true }}/>
          </div>
        )
      })}
    </div>
  )
}
