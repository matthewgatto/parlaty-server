import React from 'react';
import Close from '@components/SVG/Close';
import Upload from '@components/SVG/Upload';
import styles from './index.module.css';
import FileLoader from '@containers/withFileLoader';

export default ({label, name, value, file, onChange,inputRef, onClick, inputText, isArrParams = null}) => (<>
  {label.length ? <label className={`${styles.label} align_center`}>{label}</label> : null}
  <div className={styles.fileInputContainer}>
  <FileLoader file={file} src={value} setFile={onClick} isArrParams={isArrParams} />
  <div className={`${styles.container} align_center`} onClick={onClick}>
    <span className={`button align_center ${styles.button}`}>
    <div className={styles.name}>{inputText}</div>
    {inputText === "Upload File" ? (
      <Upload className={styles.icon} />
    ) : (
      <Close className={styles.icon} />
    )}
    </span>
    <input ref={inputRef} className={styles.hidden} name={name} type="file" onChange={onChange} />
  </div>
  </div>
</>)
