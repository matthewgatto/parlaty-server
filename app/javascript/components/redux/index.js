import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createHashHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import createReducer from '@reducers';
import rootSaga from '@sagas';
import API from '@utils/API';

export const history = createHashHistory();
const sagaMiddleware = createSagaMiddleware();
const rootReducer = createReducer(history);

const makeSlice = (entityMap) => ({
  byId: entityMap,
  allIds: Object.keys(entityMap)
})

const makeInitialState = ({auth,/*devices,actions,*/oems,businesses}) => {
  API.setToken(auth.jwt)
  const initialState = {auth}
  if(auth.roleable_type === "Oem"){
    initialState.oems = makeSlice(oems)
    initialState.businesses = makeSlice(businesses)
  }
  /*
  if(devices){
    initialState.devices = makeSlice(devices)
  }
  if(actions){
    initialState.actions = {byId:actions}
  }
  */
  return initialState
}

const getInitialState = () => {
  const localData = localStorage.getItem('login_data_2_09');
  if(localData){
    return makeInitialState(JSON.parse(localData))
  }
  return {}
}

const composeEnhancers = (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
const store = createStore(
  rootReducer,
  getInitialState(),
  composeEnhancers((applyMiddleware(routerMiddleware(history), sagaMiddleware)))
);

sagaMiddleware.run(rootSaga);

export default store;
