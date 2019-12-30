import { createStore, applyMiddleware, combineReducers } from 'redux';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import user from './reducers/user';
import entities from './reducers/entities';
import form from './reducers/form';
import images from './reducers/images';
import meta from './reducers/meta';
import toast from './reducers/toast';
import rootSaga from './sagas';

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({
    user,
    entities,
    form,
    images,
    meta,
    toast,
    router: connectRouter(history)
  }),
  {},
  applyMiddleware(routerMiddleware(history), sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;
