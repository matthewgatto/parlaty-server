import { put, takeEvery } from 'redux-saga/effects';
import actionWatcher, { loginSaga } from '../../sagas/user';
import { LOGIN_REQUEST, LOGIN_REQUEST__SUCCESS } from '../../store/user';

 describe('User sagas', () => {
   it('should dispatch action "LOGIN_REQUEST__SUCCESS" with result from login API', () => {
      const mockResponse = { jwt: "test" };
      const generator = loginSaga({type: LOGIN_REQUEST, payload: {email: "test@gmail.com", password: "test"}});
      generator.next();
      expect(generator.next(mockResponse).value)
       .toEqual(put({type: LOGIN_REQUEST__SUCCESS, payload: mockResponse}))
      expect(generator.next().done).toBeTruthy();
   })
})
