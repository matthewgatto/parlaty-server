import { all } from 'redux-saga/effects';

import procedureSagas from './procedure';
import userSagas from './user';

export default function* rootSaga() {
  yield all([
    procedureSagas(),
    userSagas()
  ]);
}
