import React, { useRef, useState } from 'react';
import ArrFileInput from '@components/Inputs/ArrFileInput';
import { FileInput } from "@components/Inputs";
import ImageFileDisplay from '@components/ImageFileDisplay';
import VideoFileDisplay from '@components/VideoFileDisplay';
import DocFileDisplay from '@components/DocFileDisplay';

export default ({formKey, defaultValues, ...props}) => {
  const inputRef = useRef(null);
  const [filesList, setFilesList] = useState(defaultValues || []);
  const typeFile = (file, display) => {
      if (~file.type.indexOf('video')) return display ? VideoFileDisplay : 'video';
      else if (~file.type.indexOf('image')) return display ? ImageFileDisplay : 'image';
      else if (~file.type.indexOf('application') || ~file.type.indexOf('text')) return display ? DocFileDisplay : 'application';
    },
    deleteElem = (params) => setFilesList(prev =>  prev.filter((file, i) => i !== params.index)),
    handleClick = () => {inputRef.current.click()},
    handleChange = (el) => {
      const files = [...el.currentTarget.files];
      setFilesList((prevState=[]) => [...prevState, ...files]);
      el.currentTarget.value = null;
    };
  return <ArrFileInput onClick={handleClick} deleteElem={deleteElem} typeFile={typeFile} onChange={handleChange} values={filesList} {...props} inputRef={inputRef} />
}
