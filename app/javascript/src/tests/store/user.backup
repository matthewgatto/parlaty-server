import reducer, { login, LOGIN_REQUEST, LOGIN_REQUEST__SUCCESS, LOGIN_REQUEST__FAILURE } from '../../store/user'

describe('user actions', () => {
  it('should create an action to make a login request', () => {
    const values = {email: 'test@gmail.com', password: 'password'}
    expect(login(values)).toEqual({type: LOGIN_REQUEST, payload: values})
  })
})


describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({})
  })

  it('should handle LOGIN_REQUEST__SUCCESS', () => {
    expect(
      reducer(undefined, {
        type: LOGIN_REQUEST__SUCCESS,
        payload: {test: "test"}
      })
    ).toEqual({
      test: "test"
    })
  })

  it('should handle LOGIN_REQUEST__FAILURE', () => {
    expect(
      reducer(undefined, {
        type: LOGIN_REQUEST__FAILURE,
        payload: "Unable to login"
      })
    ).toEqual({
      error: "Unable to login"
    })
  })
})
