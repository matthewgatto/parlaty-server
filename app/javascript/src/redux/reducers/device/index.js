import { combineReducers } from 'redux';
import byId from './byId';
import allIds from './allIds';
import forms from './form';

export default combineReducers({
  byId,
  allIds,
  forms
})
