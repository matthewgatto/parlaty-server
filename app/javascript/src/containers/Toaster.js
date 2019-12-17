import React from 'react';
import { connect } from 'react-redux';
import Toaster from '../components/Toaster';
import { removeToast } from '../redux/actions';

export default connect(
  ({toast}) => ({toasts: toast}),
  {removeToast}
)(Toaster);
