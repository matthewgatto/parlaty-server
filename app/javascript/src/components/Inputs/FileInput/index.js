import React, {useRef,useEffect} from 'react';
import { useFormContext } from "react-hook-form";
import Close from '../../SVG/Close';
import Upload from '../../SVG/Upload';
import styles from './index.module.css';

const getInputText = (value) => {
  if(value){
    if(typeof value === 'string') return "File"
    if(typeof value.name === 'string') return value.name
  }
  return "Upload"
}


export default ({label, name, initialValue, value, onChange}) => {
  const inputRef = useRef(null);
  const { setValue } = useFormContext()
  const inputText = getInputText(value)
  const handleClick = () => {
    if(value){
      setValue(name, null);
      inputRef.current.value = null;
    } else {
      inputRef.current.click();
    }
  }
  useEffect(() => {
    if(!value){
      inputRef.current.value = null;
    }
  },[value])
  return(
    <div className={`${styles.container} align_center`} onClick={handleClick}>
      <label className={`${styles.label} align_center`}>{label}</label>
      <span className={`button align_center ${styles.button}`}>
      <div className={styles.name}>{inputText}</div>
      {inputText === "Upload" ? (
        <Upload className={styles.icon} />
      ) : (
        <Close className={styles.icon} />
      )}
      </span>
      <input ref={inputRef} className={styles.hidden} name={name} type="file" onChange={onChange} />
    </div>
  )
}
