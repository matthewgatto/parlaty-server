import merge from 'lodash/merge'
export const FETCH_ENTITY = "FETCH_ENTITY";
export const RECIEVE_ENTITIES = "RECIEVE_ENTITIES";
export const UPDATE_ENTITY_REQUEST = "UPDATE_ENTITY_REQUEST";
export const CREATE_ENTITY_REQUEST = "CREATE_ENTITY_REQUEST";

export const fetchEntity = (url, entityKey, id) => ({type: FETCH_ENTITY, url, entityKey, id, meta: {isFetching: true}})
export const addEntities = (entities, entityKey, id) => ({type: RECIEVE_ENTITIES, entities, entityKey, id})

const initialState = {oems: {}, businesses: {}, procedures: {}, steps: {}, landing: {}};
export default function(state = initialState, {type, entityKey, entities, id, meta}){
  switch (type) {
    case RECIEVE_ENTITIES:
      return merge({}, state, entities)
    default:
      return state;
  }
}
