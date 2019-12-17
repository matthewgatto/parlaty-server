import * as types from '../types'

export default function reducer(previousState = [], {type, payload}){
  switch (type) {
    case types.ADD_TOAST:
      return [...previousState, payload]
    case types.REMOVE_TOAST:
      return previousState.filter(toast => toast.id !== payload)
    default:
      return previousState
  }
}
