import { login, LOGIN_REQUEST } from '../../store/user'

describe('user actions', () => {
  it('should create an action to make a login request', () => {
    const values = {email: 'test@gmail.com', password: 'password'}
    expect(login(values)).toEqual({type: LOGIN_REQUEST, payload: values})
  })
})
