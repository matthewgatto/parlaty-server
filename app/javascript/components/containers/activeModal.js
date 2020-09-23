import React from "react";
import {useSelector} from "react-redux";
import { getModal } from '@selectors/modal';

export default (WrappedComponent, modalType) => (props) => {
  const modal = useSelector(getModal);
  if (modal && modal.type === modalType) {
    return <WrappedComponent {...props} modalData={modal.data && modal.data.isArrParams ? modal.data.src : modal.data}/>
  }
  return null;
}
