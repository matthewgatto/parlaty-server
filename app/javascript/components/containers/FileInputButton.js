import React, { useRef, useState } from 'react';
import FileInputButton from '@components/Inputs/FileInputButton';
import { FileInput } from "@components/Inputs";
import ImageFileDisplay from '@components/ImageFileDisplay';
import VideoFileDisplay from '@components/VideoFileDisplay';
import DocFileDisplay from '@components/DocFileDisplay';

export default ({formKey, defaultValues, ...props}) => {
  const inputRef = useRef(null);
  const [filesList, setFilesList] = useState(defaultValues || []);
  const typeFile = file => {
      if (~file.type.indexOf('video')) return VideoFileDisplay;
      else if (~file.type.indexOf('image')) return ImageFileDisplay;
      else if (~file.type.indexOf('application') || ~file.type.indexOf('text')) return DocFileDisplay;
    },
    deleteElem = (params) => setFilesList(prev =>  prev.filter((file, i) => i !== params.index)),
    handleClick = () => {inputRef.current.click()},
    handleChange = (el) => {
      const files = [...el.currentTarget.files];
      setFilesList((prevState=[]) => [...prevState, ...files]);
      el.currentTarget.value = null;
    };
  // console.log('filesList', filesList);
  return <FileInputButton onClick={handleClick} deleteElem={deleteElem} typeFile={typeFile} onChange={handleChange} values={filesList} {...props} inputRef={inputRef} />
}
