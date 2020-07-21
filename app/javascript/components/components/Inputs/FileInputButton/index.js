import React from 'react';
import Upload from '@components/SVG/Upload';
import styles from './index.module.css';
import { FileInput } from "@components/Inputs";

export default ({label, name, initialValue, onClick, onChange, inputRef, values, deleteElem, typeFile, formKey, root }) => (
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
      {values && [...values].map((file, i) => {
        console.log('file', file);
      return (<FileInput name={name+'['+i+']'} label="" formKey={formKey} index={i} defaultValue={file} root={root} key={i} customClick={deleteElem} displayComponent={typeFile(file)}/>
      )})}
    </div>
  </>
)
