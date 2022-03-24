import React from 'react';
import 'typeface-poppins';
import { ConnectedRouter as Router } from 'connected-react-router';
import { Provider } from 'react-redux';
import Routes from './Routes';
import ErrorBoundary from '@components/ErrorBoundary';
import Toaster from '@containers/Toaster';
import './index.css';
import store, {history} from './redux';

export default () => (
  <Provider store={store}>
    <Router history={history}>
        <ErrorBoundary>
          <Routes />
          <Toaster />
        </ErrorBoundary>
    </Router>
  </Provider>
)
