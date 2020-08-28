import React from 'react';
import Upload from '@components/SVG/Upload';
import styles from './index.module.css';
import { FileInput, Radio  } from "@components/Inputs";
import { typeFile, makeName } from '@utils';

export default ({label, name, onClick, onChange, inputRef, values, deleteElem, formKey, root, radio, idx, objName }) => (
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
        const type = typeFile(file), radioParams = radio.params.filter(obj=> obj.type === type[1])[0];
        return (
          <div key={file.id || file.lastModified +  Math.random(10000)} className={styles.fileList}>
            <FileInput file={file} isArrParams={{index: i, idx, objName}} name={name+'['+i+']'} label="" formKey={formKey} index={i} defaultValue={file.visual || file} root={root} customClick={deleteElem} />
            {radio.isShown && radioParams && <Radio name={makeName(root, radio.actionRoot)} withoutChecked={radio.withoutChecked} root={root} index={i} actionRoot={radio.actionRoot} defaultValue={radio.defaultValue || -1} label={radioParams.label || ''} labelClass={styles.radio}/>}
          </div>
        )
      })}
    </div>
  </>
)
