import React from 'react';
import { useDispatch } from 'react-redux';
import { setModal } from '@actions/modal';

export default ({children, modal, modalData = null, className}) => {
  const dispatch = useDispatch();
  const handleClick = () => dispatch(setModal(modal, modalData));
  return(
    <div className={className} onClick={handleClick}>
      {children}
    </div>
  )
}
