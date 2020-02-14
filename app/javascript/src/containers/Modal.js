import React from 'react';
import { useSelector } from 'react-redux';
import Modal from '@components/Modal/Overlay';
import { isModalOpen } from '@selectors/modal';

export default ({children}) => {
  const isOpen = useSelector(isModalOpen);
  if(isOpen){
    return(
      <Modal>
        {children}
      </Modal>
    )
  }
  return null;
}
