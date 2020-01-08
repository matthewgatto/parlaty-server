import { combineReducers } from 'redux';
import byId from './byId';
import forms from './form';
import images from './image';
import open from './step';

export default combineReducers({
  byId,
  forms,
  images,
  open
})
