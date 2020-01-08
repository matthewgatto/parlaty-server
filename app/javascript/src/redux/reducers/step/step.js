import { LOCATION_CHANGE } from 'connected-react-router';
import {
  ADD_STEP_FORM,
  SET_CURRENT_STEP_FORM
} from '../../types/step';

export default (state = null, {type, payload}) => {
  switch (type) {
    case ADD_STEP_FORM:
      return {id: payload.id, initialValues: payload.initialValues, isDuplicate: payload.isDuplicate};
    case SET_CURRENT_STEP_FORM:
      return payload && payload.step ? payload.step : null;
    case LOCATION_CHANGE:
      return null;
    default:
      return state;
  }
}
