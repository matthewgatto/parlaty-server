import * as types from '../types'

const initialState = {oems: {}, businesses: {}, procedures: {}, steps: {}, landing: {}, creating: {}};
export default function(state = initialState, {type, entityKey, entities, id, meta, values, payload}){
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
    case types.CREATE_ENTITY_REQUEST:
      return {
        ...state,
        creating: {
          ...state.creating,
          [id]: {
            isProcessing: true
          }
        }
      }
    case types.CREATE_STEP_REQUEST:
      return {
        ...state,
        creating: {
          ...state.creating,
          [payload.step.id]: {
            isProcessing: true
          }
        }
      }
    case types.CREATE_STEP_REQUEST__SUCCESS:
      return {
        ...state,
        creating: {
          ...state.creating,
          [id]: {}
        }
      }
    case types.RECIEVE_ENTITIES:
      var entityMap;
      if(entityKey == "creating"){
        const {[id]: oldMeta, ...newMap} = state.creating;
        entityMap = newMap
      } else {
        entityMap = id ? ({
          ...state[entityKey],
          [id]: ({})
        }) : ({})
      }
      return {
        ...state,
        [entityKey]: entityMap
      }
    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
}
