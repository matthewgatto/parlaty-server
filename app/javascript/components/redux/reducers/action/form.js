import * as types from '@types/action';
import {immutableMove} from '@utils';

export default (state = [], {type, payload}) => {
  switch (type) {
    case types.ADD_ACTION_FORM:
      return state.length > 0 ? [...state, payload] : [payload]
    case types.REMOVE_ACTION_FORM:
      return [...state.slice(0,payload),...state.slice(payload+1)]
    case types.REORDER_ACTION_FORM:
      return immutableMove(state, payload.from, payload.to)
    case types.CLEAR_ACTION_FORMS:
      return [];
    case types.LOAD_ACTION_FORMS:
      return payload;
    case types.UPDATE_ACTION_FILE_LIST:{
      state.splice(payload.idx,1, {...state[payload.idx], localFileList: payload.fileList});
      return state;
    }
    default:
      return state
  }
}
