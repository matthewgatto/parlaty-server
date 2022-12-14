import React from 'react';
import Upload from '@components/SVG/Upload';
import styles from './index.module.css';
import { FileInput, Radio } from "@components/Inputs";
import { typeFile, makeName } from '@utils';

export default ({label, name, onClick, onChange, inputRef, values, deleteElem, formKey, root, radio, idx, objName, setTabValues }) => (
  <>
    <label className={`${styles.label} align_center`}>{label}</label>
    <div className={styles.fileInputContainer}>
      <label htmlFor={inputRef} className={`${styles.container} align_center`} onClick={onClick}>
        <span className={`button align_center ${styles.button}`}>
        <span className={styles.name}>Upload File</span>
          <Upload className={styles.icon} />
        </span>
        <input ref={inputRef} className={styles.hidden} type="file" onChange={onChange} multiple accept=".xls,.xlsx,.pdf,.txt,.png,.jpg,.jpeg,.mp4,.zip,.doc,.docx,.gif,.svg,.mov,.m4a,.mp3"/>
      </label>
    </div>
    <div className={styles.file_container}>
      {values && [...values].map((file, i) => {
        const type = typeFile(file), radioParams = radio.params.filter(obj=> obj.type === type[1])[0];
        return (
          <div key={file.id} className={styles.fileList}>
            <FileInput file={file} isArrParams={{index: i, idx, objName}} name={name+'['+i+']'} label="" formKey={formKey} index={i} defaultValue={file.visual || file} root={root} customClick={deleteElem} />
            {radio.isShown && radioParams && <Radio setTabValues={setTabValues} name={makeName(root, radio.actionRoot)} idx={idx} withoutChecked={radio.withoutChecked} root={root} index={i} actionRoot={radio.actionRoot} defaultValue={radio.defaultValue || (radio.defaultValue === 0 ? 0 : -1)} label={radioParams.label || ''} labelClass={styles.radio}/>}
          </div>
        )
      })}
    </div>
  </>
)
