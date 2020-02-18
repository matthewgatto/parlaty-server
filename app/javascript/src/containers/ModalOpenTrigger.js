import React from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '@actions/modal';

export default ({children}) => {
  const dispatch = useDispatch();
  const handleClick = () => dispatch(openModal())
  return(
    <div onClick={handleClick}>
      {children}
    </div>
  )
}
