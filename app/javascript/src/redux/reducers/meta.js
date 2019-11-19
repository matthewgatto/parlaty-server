import {
  FETCH_ENTITY,
  RECIEVE_ENTITIES,
  UPDATE_ENTITY_REQUEST
} from './entities';
export const SET_ENTITY_META = "SET_ENTITY_META";
export const fetchEntity = (url, entityKey, id) => ({type: FETCH_ENTITY, url, entityKey, id, meta: {isFetching: true}})
export const setEntityFetchError = (fetchError, entityKey, id) => ({type: SET_ENTITY_META, entityKey, id, meta: {fetchError}})
export const setEntityFormErrors = (formError, fieldErrors, entityKey, id) => ({type: SET_ENTITY_META, entityKey, id, meta: {formError, fieldErrors, isProcessing: false}})
export const handleEntityUpdateSubmit = (url, entityKey, id, values) => ({type: UPDATE_ENTITY_REQUEST, url, entityKey, id, values, meta: {isProcessing: true}});

const initialState = {oems: {}, businesses: {}, procedures: {}, steps: {}, landing: {}};
export default function(state = initialState, {type, entityKey, entities, id, meta}){
  switch (type) {
    case FETCH_ENTITY:
    case SET_ENTITY_META:
    case UPDATE_ENTITY_REQUEST:
      return {
        ...state,
        [entityKey]: id ? ({
          ...state[entityKey],
          [id]: meta
        }) : (
          meta
        )
      }

    case RECIEVE_ENTITIES:
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
