import React, { useRef, useState, useEffect } from 'react';
import ArrFileInput from '@components/Inputs/ArrFileInput';
import { FileInput } from "@components/Inputs";
import { useDispatch } from "react-redux";
import { updateFileList } from '@actions/form';

export default ({formKey, defaultValues, idx, objName, ...props}) => {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const [filesList, setFilesList] = useState(defaultValues || []);
  useEffect(() => {
    if(defaultValues === filesList) dispatch(updateFileList(idx, objName, defaultValues));
  }, [defaultValues, idx, filesList, updateFileList]);
  const deleteElem = (params) => setFilesList(prev => {
        const newArr = prev.filter((file, i) => i !== params.index);
        dispatch(updateFileList(idx, objName, newArr));
        return newArr;
      }
    ),
    handleClick = () => {inputRef.current.click()},
    handleChange = (el) => {
      const files = [...el.currentTarget.files];
      setFilesList((prevState=[]) => [...prevState, ...files]);
      dispatch(updateFileList(idx, objName, [...filesList, ...files]));
      el.currentTarget.value = null;
    };
  return <ArrFileInput onClick={handleClick} deleteElem={deleteElem} onChange={handleChange} objName={objName} idx={idx} values={filesList} {...props} inputRef={inputRef} />
}
