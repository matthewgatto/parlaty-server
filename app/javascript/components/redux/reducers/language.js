import { combineReducers } from 'redux';
import { addIds, immutableRemove } from '@utils';
import * as languages from '@types/language'

const allLanguages = (state = null, {type, payload}) => {
  switch (type) {
    case languages.FETCH_LANGUAGES_REQUEST__SUCCESS:
      if(payload.languages){
        return addIds(state, payload.languages)
      }
    default:
      return state
  }
}

const languagesById = (state = {}, {type,payload}) => {
  switch (type) {
    case languages.FETCH_LANGUAGES_REQUEST__SUCCESS:
      if(payload.languages){
        return {
          ...state,
          ...payload.languages
        }
      }
    default:
      return state
  }
}

export default combineReducers({
  byId: languagesById,
  allIds: allLanguages
})
