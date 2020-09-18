import React, {useRef, useState } from 'react';
import ArrFileInput from '@components/Inputs/ArrFileInput';
import { useDispatch } from "react-redux";
import { updateFileList } from '@actions/template';

export default ({formKey, defaultValues, idx, objName, ...props}) => {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const [filesList, setFilesList] = useState(defaultValues || []);
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
