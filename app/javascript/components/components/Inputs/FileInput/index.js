import React from 'react';
import Close from '@components/SVG/Close';
import Upload from '@components/SVG/Upload';
import styles from './index.module.css';

export default ({label, name, initialValue, value, onChange,inputRef, onClick, inputText, displayComponent: DisplayComponent, index}) => (<>
  {label.length ? <label className={`${styles.label} align_center`}>{label}</label> : null}
  <div className={styles.fileInputContainer}>
  <DisplayComponent src={value} setFile={onClick}/>
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
    {index}
  </div>
</>)
