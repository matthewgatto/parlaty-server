import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Toaster from '../components/Toaster/List';
import { removeToast } from '../redux/actions/toast';

export default () => {
  const toasts = useSelector(({toast}) => toast);
  const dispatch = useDispatch();
  const handleRemoveToast = id => () => dispatch(removeToast(id));
  return <Toaster toasts={toasts} handleRemove={handleRemoveToast} />
}
