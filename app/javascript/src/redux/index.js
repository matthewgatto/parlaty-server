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
    const storageData = JSON.parse(userFromStorage)
    API.setToken(storageData.auth.jwt)
    const user_data = {auth: storageData.auth}
    if(storageData.auth.roleable_type === "Oem"){
      user_data.oems = {
        byId: storageData.oems,
        allIds: Object.keys(storageData.oems)
      }
      user_data.businesses = {
        byId: storageData.businesses,
        allIds: Object.keys(storageData.businesses)
      }
    }
    if(storageData.devices){
      user_data.devices = {
        byId: storageData.devices,
        allIds: Object.keys(storageData.devices)
      }
    }
    return user_data
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
