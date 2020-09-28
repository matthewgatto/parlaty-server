import * as types from '@types/comments';

export default (state = [], {type, payload}) => {
  switch (type) {
    case types.MAKE_READ:
      return [...state.slice(0,payload.idx),{...state[payload.idx],read: true},...state.slice(payload.idx+1)];
    // case types.DELETE_COMMENT:
    //   debugger;
    //   return [...state.slice(0,payload.idx)];
    default:
      return state
  }
}
