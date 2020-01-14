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
  const userFromStorage = localStorage.getItem('user_data');
  if(userFromStorage){
    const user_data = JSON.parse(userFromStorage)
    API.setToken(user_data.auth.jwt)
    if(user_data.auth.roleable_type === "Oem"){
      return {
        auth: user_data.auth,
        oems: {
          byId: user_data.oems,
          allIds: Object.keys(user_data.oems)
        },
        businesses: {
          byId: user_data.businesses,
          allIds: Object.keys(user_data.businesses)
        }
      }
    }
    return {auth: user_data.auth}
  }
  return {}
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  getInitialState(),
  composeEnhancers((applyMiddleware(routerMiddleware(history), sagaMiddleware)))
);

sagaMiddleware.run(rootSaga);

export default store;
