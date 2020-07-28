import React from 'react';
import Upload from '@components/SVG/Upload';
import styles from './index.module.css';
import { FileInput, Radio  } from "@components/Inputs";

export default ({label, name, onClick, onChange, inputRef, values, deleteElem, typeFile, formKey, root, radio }) => (
  <>
    <label className={`${styles.label} align_center`}>{label}</label>
    <div className={styles.fileInputContainer}>
      <label htmlFor={inputRef} className={`${styles.container} align_center`} onClick={onClick}>
        <span className={`button align_center ${styles.button}`}>
        <span className={styles.name}>Upload File</span>
          <Upload className={styles.icon} />
        </span>
        <input ref={inputRef} className={styles.hidden} type="file" onChange={onChange} multiple accept=".xls,.xlsx,.pdf,.txt,.png,.jpeg,.mp4,.zip,.doc,.gif,.svg"/>
      </label>
    </div>
    <div className={styles.file_container}>
      {values && [...values].map((file, i) => (
        <div key={file.id || file.lastModified +  Math.random(10000)} className={styles.fileList}>
          <FileInput name={name+'['+i+']'} label="" formKey={formKey} index={i} defaultValue={file.visual || file} root={root} customClick={deleteElem} displayComponent={typeFile(file, true)}/>
          {radio.isShown && typeFile(file) !== 'application' && <Radio withoutCheck={radio.withoutCheck} root={root} index={i} actionRoot={radio.actionRoot} defaultValue={radio.defaultValue || -1} label={radio.label} labelClass={styles.radio}/>}
        </div>
      ))}
    </div>
  </>
)
