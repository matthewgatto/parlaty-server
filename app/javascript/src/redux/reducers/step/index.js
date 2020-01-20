import { combineReducers } from 'redux';
import byId from './byId';
import forms from './form';
import visuals from './visual';
import open from './step';

export default combineReducers({
  byId,
  forms,
  visuals,
  open
})
