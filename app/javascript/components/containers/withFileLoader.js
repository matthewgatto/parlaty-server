import React, {useState,useEffect,useCallback} from 'react';
import { useDispatch } from 'react-redux';
import {readFile, typeFile} from '@utils';
import {setModal, changeActiveFile} from '@actions/modal';
import styles from "../components/DocFileDisplay/index.module.css";

export default ({isArrParams, file, setFile, ...props}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [src, setSrc] = useState();
  const [fileType, setFileType] = useState();
  const [name, setName] = useState();
  const type = typeFile(file);
  const Display = type[0];
  const getName = (value) => {
    if(typeof value === 'string'){
      const splitValue = value.split("/");
      return splitValue[splitValue.length - 1]
    }
    if(value.name && typeof value.name === "string") return value.name;
    return "File";
  };
  const openModal = useCallback(() => {
    if (!isArrParams || !isArrParams.change) dispatch(setModal(type[2], isArrParams ? {isArrParams, src, fileType, name} : {src, fileType, name}));
    else dispatch(changeActiveFile({src: src, ...isArrParams, fileType, name, type: type[2]}));
  }, [src, dispatch]);
  const setImageSrc = useCallback(async () => {
    setFileType(props.src instanceof File ? props.src.name.split('.').pop() || props.src.type.split('/').pop() : props.src.split('.').pop());
    setName(getName(props.src));
    setSrc(props.src instanceof File ? await readFile(props.src) : props.src);
  }, [props.src, setSrc]);
  useEffect(() => {
    if( type[2] === 'doc_preview' ||  type[2] === 'audio_preview' ) {
      setIsLoading(false)
    } else {
      setIsLoading(true);
    }
    setImageSrc();
  }, [setImageSrc, setIsLoading]);
  return (
    <>
      {src ? (
        <Display params={file} src={src} onLoad={() => setIsLoading(false)} isLoading={isLoading} onClick={isLoading ? undefined : openModal}/>
      ) : (
        <div onClick={setFile} className={styles.placeholder}>No File Uploaded</div>
      )}
    </>
  )
}
