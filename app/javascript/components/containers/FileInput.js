import React, {useRef,useEffect} from 'react';
import { useFormContext } from "react-hook-form";
import FileInput from '@components/Inputs/FileInput';

const getInputText = (value) => {
  if(value){
    if(typeof value === 'string'){
      const splitValue = value.split("/");
      return splitValue[splitValue.length - 1]
    }
    if(value.name && typeof value.name === "string") return value.name;
    return "File"
  }
  return "Upload File"
};

export default ({customClick = null, ...props}) => {
  const inputRef = useRef(null);
  const { setValue } = useFormContext();
  const inputText = getInputText(props.value);
  const handleInputClick = () => {
    if(customClick) customClick(props);
    else {
      if(props.value) {
        setValue(props.name, null);
        inputRef.current.value = null;
      } else {
        inputRef.current.click();
      }
    }
  };
  useEffect(() => {
    if(!props.value){
      inputRef.current.value = null;
    }
  },[props.value]);
  console.log(props);
  return <FileInput {...props} inputRef={inputRef} onClick={handleInputClick} inputText={inputText} />
}
