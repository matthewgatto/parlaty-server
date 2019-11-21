import * as types from '../types'

const initialState = {oems: {}, businesses: {}, procedures: {}, steps: {}, landing: {}};
export default function(state = initialState, {type, entityKey, entities, id, meta}){
  switch (type) {
    case types.FETCH_ENTITY:
    case types.SET_ENTITY_META:
    case types.UPDATE_ENTITY_REQUEST:
      return {
        ...state,
        [entityKey]: id ? ({
          ...state[entityKey],
          [id]: meta
        }) : (
          meta
        )
      }

    case types.RECIEVE_ENTITIES:
      return {
        ...state,
        [entityKey]: id ? ({
          ...state[entityKey],
          [id]: ({})
        }) : ({})
      }
    default:
      return state;
  }
}
