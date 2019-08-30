import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import form from './form';
import procedure from './procedure';
import user from './user';
import rootSaga from '../sagas';
import API from '../utils/API';

const sagaMiddleware = createSagaMiddleware();

function getPreloadedState(){
  let preloadedState = {};
  let user = localStorage.getItem('user');
  if(user){
    let userFromStorage = JSON.parse(user);
    preloadedState.user = userFromStorage;
    API.setToken(userFromStorage.jwt);
  }
  return preloadedState;
}

const store = createStore(
  combineReducers({
    form,
    procedure,
    user
  }),
  getPreloadedState(),
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;
