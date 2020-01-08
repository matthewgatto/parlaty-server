import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducers';
import rootSaga from './sagas';
import API from '../utils/API';

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
const rootReducer = createReducer(history);
const getInitialState = () => {
  const userFromStorage = localStorage.getItem('auth');
  var auth;
  if(userFromStorage){
    auth = JSON.parse(userFromStorage)
    API.setToken(auth.jwt)
  }
  return {auth}
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  getInitialState(),
  composeEnhancers((applyMiddleware(routerMiddleware(history), sagaMiddleware)))
);

sagaMiddleware.run(rootSaga);

export default store;
