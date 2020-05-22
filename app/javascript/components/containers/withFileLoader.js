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
  useEffect(() => {
    const setImageSrc = async () => setSrc(props.src instanceof File ? await readFile(props.src) : props.src)
    setIsLoading(true);
    setImageSrc();
  }, [props.src, setSrc, setIsLoading])
  return <WrappedComponent src={src} onLoad={() => setIsLoading(false)} isLoading={isLoading} onClick={isLoading ? undefined : openModal} />
}
