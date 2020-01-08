import * as types from '../types/toast'

export default function reducer(state = [], {type, payload}){
  switch (type) {
    case types.ADD_TOAST:
      return [...state, payload]
    case types.REMOVE_TOAST:
      return state.filter(toast => toast.id !== payload)
    default:
      return state
  }
}
