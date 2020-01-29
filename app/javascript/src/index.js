import React from 'react';
import { ConnectedRouter as Router } from 'connected-react-router';
import { Provider } from 'react-redux';
import App from './App';
import ErrorBoundary from '@components/ErrorBoundary';
import Toaster from '@containers/Toaster';
import './index.css';
import store, {history} from './redux';
//import './poppins.css';

export default () => (
  <Provider store={store}>
    <Router history={history}>
        <ErrorBoundary>
          <App />
          <Toaster />
        </ErrorBoundary>
    </Router>
  </Provider>
)
