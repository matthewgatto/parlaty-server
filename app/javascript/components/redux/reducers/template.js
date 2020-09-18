import * as types from '@types/template';

export default (state = [], {type, payload}) => {
  switch (type) {
    case types.UPDATE_STEP_FILE_LIST:
      state.splice(payload.idx,1, {...state[payload.idx], visuals: payload.fileList});
      return state;
    case types.SET_STEP_VALUES:
      return [...state.slice(0,payload.idx),{...state[payload.idx], ...payload.values},...state.slice(payload.idx+1)];
    default:
      return state
  }
}
