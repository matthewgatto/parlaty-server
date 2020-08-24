import React, { useRef, useState, useEffect } from 'react';
import ArrFileInput from '@components/Inputs/ArrFileInput';
import { FileInput } from "@components/Inputs";
import { useDispatch } from "react-redux";
import { updateFileList } from '@actions/form';

export default ({formKey, defaultValues, idx, ...props}) => {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const [filesList, setFilesList] = useState(defaultValues || []);
  useEffect(() => {
    if(defaultValues === filesList) dispatch(updateFileList(idx, props.item, defaultValues));
  }, [defaultValues, idx, filesList, updateFileList]);
  const deleteElem = (params) => setFilesList(prev => {
        const newArr = prev.filter((file, i) => i !== params.index);
        dispatch(updateFileList(idx, props.item, newArr));
        return newArr;
      }
    ),
    handleClick = () => {inputRef.current.click()},
    handleChange = (el) => {
      const files = [...el.currentTarget.files];
      setFilesList((prevState=[]) => [...prevState, ...files]);
      dispatch(updateFileList(idx, props.item, [...filesList, ...files]));
      el.currentTarget.value = null;
    };
  return <ArrFileInput onClick={handleClick} deleteElem={deleteElem} onChange={handleChange} idx={idx} values={filesList} {...props} inputRef={inputRef} />
}
