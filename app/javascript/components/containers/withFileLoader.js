import React, {useState,useEffect,useCallback} from 'react';
import { useDispatch } from 'react-redux';
import {readFile} from '@utils';
import {setModal} from '@actions/modal';

export default (WrappedComponent, modal) => (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [src, setSrc] = useState();
  const openModal = useCallback(() => {
    dispatch(setModal(modal, src))
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
