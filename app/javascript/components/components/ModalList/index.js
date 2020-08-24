import React, { useCallback } from 'react';
import { setModal, changeActiveFile } from '@actions/modal';
import { FileInput } from '@components/Inputs';
import { readFile, typeFile } from '@utils';
import styles from "./index.module.css";
import { getStepFileList } from '@selectors/step';
import { getActionFileList } from '@selectors/action';
import {useDispatch, useSelector} from "react-redux";
import FileLoader from '@containers/withFileLoader';

// export default ({params}) => {
//   const {index: activeIndex, idx} = params;
//   const dispatch = useDispatch();
//   const files = useSelector(getStepFileList(idx));
//   const openModal = useCallback((src, isArrParams, type) => {
//     debugger;
//     dispatch(changeActiveFile({src: src, ...isArrParams, type: type[2]}));
//   }, [dispatch, changeActiveFile]);
//   return(
//     <div className={`${styles.panel} ${files.length > 1 ? '' : styles.hide}`}>
//       {files && [...files].map((file, i) => {
//         const type = typeFile(file), DisplayComponent = type[0];
//         const fileSrc = file.visual || file;
//         const src = fileSrc instanceof File ? readFile(fileSrc) : fileSrc;
//         return (
//           <div key={file.id || file.lastModified +  Math.random(10000)} className={`${styles.fileList} ${activeIndex === i ? styles.activeFile : null}`}>
//             <DisplayComponent params={file} className={styles.textContent} isLoading={false} src={src} isArrParams={{ index: i, idx, change: true }} onClick={()=>openModal(src, { index: i, idx, change: true }, type)}/>
//           </div>
//         )
//       })}
//     </div>
//   )
// }


export default ({params}) => {
  const {index: activeIndex, idx, item} = params;
  const files = useSelector(item === 'step' ? getStepFileList(idx) : item === 'action' ? getActionFileList(idx): null);
  return(
    <div className={styles.panel}>
      {files && [...files].map((file, i) => (
          <div key={file.id || file.lastModified +  Math.random(10000)} className={`${styles.fileList} ${activeIndex === i ? styles.activeFile : null}`}>
            <FileLoader file={file} src={file.visual || file} isArrParams={{ index: i, idx, change: true }} />
          </div>
        )
      )}
    </div>
  )
}