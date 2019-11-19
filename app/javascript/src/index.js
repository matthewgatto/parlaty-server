import React from 'react';

import { ConnectedRouter as Router } from 'connected-react-router';
import { Provider } from 'react-redux';
import Layout from './components/Layout';
import Routes from './containers/Routes';
import './index.css';
import store, {history} from './redux';
//import './poppins.css';

const App = () =>
  <Provider store={store}>
    <Router history={history}>
      <Layout>
        <Routes />
      </Layout>
    </Router>
  </Provider>

export default App;
