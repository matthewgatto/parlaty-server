import React from 'react';
import { useSelector } from 'react-redux';
import ModalOverlay from '@components/Modal/Overlay';
import { getModal } from '@selectors/modal';

export default (WrappedComponent, modalType) => (props) => {
  const modal = useSelector(getModal);
  if(modal && modal.type === modalType){
    return(
      <ModalOverlay>
        <WrappedComponent {...props} modalData={modal.data} />
      </ModalOverlay>
    )
  }
  return null
}