import { createStore, applyMiddleware, combineReducers } from 'redux';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import user from './reducers/user';
import entities from './reducers/entities';
import form from './reducers/form';
import meta from './reducers/meta';
import rootSaga from './sagas';

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({
    user,
    entities,
    form,
    meta,
    router: connectRouter(history)
  }),
  {},
  applyMiddleware(routerMiddleware(history), sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;
