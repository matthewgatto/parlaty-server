import { combineReducers } from 'redux';
import byId from './byId';
import forms from './form';
import open from './step';

export default combineReducers({
  byId,
  forms,
  open
})
