import {SET_MODAL} from '@types/modal'

const SET_PROGRESS = "SET_PROGRESS";
export const setProgress = (n) => ({type: SET_PROGRESS, payload: n});

export default function reducer(state = 0, {type, payload}){
  switch (type) {
    case SET_MODAL:
      return 0;
    case SET_PROGRESS:
      return payload;
    default:
      return state
  }
}
