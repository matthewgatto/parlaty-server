import { LOCATION_CHANGE } from 'connected-react-router';
import * as types from '@types/modal'

export default function reducer(state = false, {type, payload}){
  switch (type) {
    case types.OPEN_MODAL:
      return true
    case LOCATION_CHANGE:
    case types.CLOSE_MODAL:
      return false
    default:
      return state
  }
}
