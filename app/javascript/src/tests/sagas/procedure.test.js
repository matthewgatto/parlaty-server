import { put, takeEvery } from 'redux-saga/effects';
import { createStepSaga } from '../../sagas/procedure';
import { LOGIN_REQUEST, LOGIN_REQUEST__SUCCESS } from '../../store/user';

 describe('Procedure sagas', () => {
   it('should dispatch action "LOGIN_REQUEST__SUCCESS" with result from login API', () => {
     /*
      const mockResponse = { jwt: "test" };
      const generator = createStepSaga();
      generator.next();
      generator.next();

      expect(generator.next(mockResponse).value)
       .toEqual(put({type: LOGIN_REQUEST__SUCCESS, payload: mockResponse}))
      expect(generator.next().done).toBeTruthy();
      */
   })
})
