import React, {useRef,useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useFormContext } from "react-hook-form";
import Close from '../SVG/Close';
import Upload from '../SVG/Upload';

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
    <div className="file_input" onClick={handleClick}>
      <label className="field__label">{label}</label>
      <span className="file_input__button">
      <div className="file_input__name">{inputText}</div>
      {inputText === "Upload" ? (
        <Upload className="file_input__icon" />
      ) : (
        <Close className="file_input__icon" />
      )}
      </span>
      <input ref={inputRef} className="file_input__hidden" name={name} type="file" onChange={onChange} />
    </div>
  )
}
