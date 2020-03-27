import React from 'react';
import { useSelector } from 'react-redux';
import ModalOverlay from '@components/Modal/Overlay';
import { getModal } from '@selectors/modal';

export default ({children}) => {
  const modal = useSelector(getModal);
  if(modal){
    var content;
    React.Children.forEach(children, child => {
        if (child.props.modal === modal){
            content = child;
        }
    });
    if(content){
      return(
        <ModalOverlay>
          {content}
        </ModalOverlay>
      )
    }
  }
  return null;
}
