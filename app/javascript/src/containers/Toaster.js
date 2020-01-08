import React from 'react';
import { connect } from 'react-redux';
import Toaster from '../components/Toaster';
import { removeToast } from '../redux/actions/toast';

export default connect(
  ({toast}) => ({toasts: toast}),
  {removeToast}
)(Toaster);
