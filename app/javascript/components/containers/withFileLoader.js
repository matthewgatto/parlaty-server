import React, {useState,useEffect,useCallback} from 'react';
import { useDispatch } from 'react-redux';
import {readFile} from '@utils';
import {setModal, changeActiveFile} from '@actions/modal';
import { getStepFileList } from '@selectors/step';

export default (WrappedComponent, modal) => ({isArrParams, ...props}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [src, setSrc] = useState();
  const openModal = useCallback(() => {
    if (!isArrParams || !isArrParams.change) dispatch(setModal(modal, isArrParams ? {isArrParams, src} : src));
    else dispatch(changeActiveFile({src: props.src, ...isArrParams}));
  }, [src, dispatch]);
  const setImageSrc = useCallback(async () => {
    setSrc(props.src instanceof File ? await readFile(props.src) : props.src)
  }, [props.src, setSrc]);
  useEffect(() => {
    setIsLoading(true);
    setImageSrc();
  }, [setImageSrc, setIsLoading]);
  return <WrappedComponent src={src} params={props.src} onLoad={() => setIsLoading(false)} isLoading={isLoading} onClick={isLoading ? undefined : openModal} />
}
