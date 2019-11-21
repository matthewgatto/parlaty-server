import merge from 'lodash/merge'
import * as types from '../types'


const initialState = {oems: {}, businesses: {}, procedures: {}, steps: {}, landing: {}};
export default function(state = initialState, {type, entityKey, entities, id, meta}){
  switch (type) {
    case types.RECIEVE_ENTITIES:
      return merge({}, state, entities)
    default:
      return state;
  }
}
