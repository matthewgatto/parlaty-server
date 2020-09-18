import React, {useState,useEffect,useCallback} from 'react';
import { useDispatch } from 'react-redux';
import {readFile, typeFile} from '@utils';
import {setModal, changeActiveFile} from '@actions/modal';
import styles from "../components/DocFileDisplay/index.module.css";

export default ({isArrParams, file, setFile, ...props}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [src, setSrc] = useState();
  const type = typeFile(file);
  const Display = type[0];
  const openModal = useCallback(() => {
    if (!isArrParams || !isArrParams.change) dispatch(setModal(type[2], isArrParams ? {isArrParams, src} : src));
    else dispatch(changeActiveFile({src: src, ...isArrParams, type: type[2]}));
  }, [src, dispatch]);
  const setImageSrc = useCallback(async () => {
    setSrc(props.src instanceof File ? await readFile(props.src) : props.src)
  }, [props.src, setSrc]);
  useEffect(() => {
    setIsLoading(true);
    setImageSrc();
  }, [setImageSrc, setIsLoading]);
  return (
    <>
      {src ? (
        <Display params={file} src={src} onLoad={() => setIsLoading(false)} isLoading={isLoading} onClick={(isLoading && !file.type.indexOf('application')) ? undefined : openModal}/>
      ) : (
        <div onClick={setFile} className={styles.placeholder}>No File Uploaded</div>
      )}
    </>
  )
}
