import { combineReducers } from 'redux';
import byId from './byId';
import forms from './form';

export default combineReducers({
  byId,
  forms
})
