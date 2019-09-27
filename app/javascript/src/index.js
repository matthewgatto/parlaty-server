import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Layout from './components/Layout';
import ProcedurePage from './containers/ProcedurePage';
import LoginPage from './containers/LoginPage';
import './index.css';
import store from './store';
//import './poppins.css';

const App = () =>
  <Router>
    <Provider store={store}>
      <Layout>
        <Route exact path="/" component={ProcedurePage} />
        <Route path="/login" exact component={LoginPage} />
      </Layout>
    </Provider>
  </Router>

export default App;
