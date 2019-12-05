import React from 'react';

import { ConnectedRouter as Router } from 'connected-react-router';
import { Provider } from 'react-redux';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import Routes from './containers/Routes';
import './index.css';
import store, {history} from './redux';
//import './poppins.css';

const App = () =>
  <Provider store={store}>
    <Router history={history}>
      <Layout>
        <ErrorBoundary>
          <Routes />
        </ErrorBoundary>
      </Layout>
    </Router>
  </Provider>

export default App;
