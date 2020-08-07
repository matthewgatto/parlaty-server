import React, { useRef, useState, useEffect } from 'react';
import ArrFileInput from '@components/Inputs/ArrFileInput';
import { FileInput } from "@components/Inputs";
import { useDispatch } from "react-redux";
import { updateFileList } from '@actions/step';

export default ({formKey, defaultValues, idx, ...props}) => {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const [filesList, setFilesList] = useState(defaultValues || []);
  useEffect(() => {
    if(defaultValues === filesList) dispatch(updateFileList(idx, defaultValues));
  }, [defaultValues, idx, filesList, updateFileList]);
  const deleteElem = (params) => setFilesList(prev =>  prev.filter((file, i) => i !== params.index)),
    handleClick = () => {inputRef.current.click()},
    handleChange = (el) => {
      const files = [...el.currentTarget.files];
      setFilesList((prevState=[]) => [...prevState, ...files]);
      dispatch(updateFileList(idx, [...filesList, ...files]));
      el.currentTarget.value = null;
    };
  return <ArrFileInput onClick={handleClick} deleteElem={deleteElem} onChange={handleChange} idx={idx} values={filesList} {...props} inputRef={inputRef} />
}
