import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Toaster from '@components/Toaster/List';
import { removeToast } from '@actions/toast';
import { getToasts } from '@selectors/toast';

export default () => {
  const toasts = useSelector(getToasts);
  const dispatch = useDispatch();
  const handleRemoveToast = id => () => dispatch(removeToast(id));
  return <Toaster toasts={toasts} handleRemove={handleRemoveToast} />
}
