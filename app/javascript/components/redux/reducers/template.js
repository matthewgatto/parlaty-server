import * as steps from '@types/step';
import * as types from '@types/template';

export default (state = [], {type, payload}) => {
  switch (type) {
    case steps.ADD_STEP_FORM:
      return state.length > 0 ? [...state, payload.formValues] : [payload.formValues];
    case steps.REMOVE_STEP_FORM:
      state.splice(payload,1);
      return state;
    case steps.STEP_SAVE_REQUEST__SUCCESS:
      state.splice(payload.idx,1, {...state[payload.idx], ...payload.steps[payload.id]});
      return state;
    case types.UPDATE_STEP_FILE_LIST:
      state.splice(payload.idx,1, {...state[payload.idx], visuals: payload.fileList});
      return state;
    case types.SET_STEP_VALUES:
      return [...state.slice(0,payload.idx),{...state[payload.idx], ...payload.values},...state.slice(payload.idx+1)];
    default:
      return state
  }
}
