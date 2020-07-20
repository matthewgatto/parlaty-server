import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import auth from './auth';
import oems from './oem';
import oem_businesses from './oem_business';
import procedures from './procedure';
import form from './form';
import steps from './step';
import devices from './device';
import actions from './action';
import toast from './toast';
import modal from './modal';
import progress from './progress';
import users from './user';
import API from '@utils/API';

export default function(history){
  const reducers = combineReducers({
    auth,
    oems,
    oem_businesses,
    procedures,
    devices,
    actions,
    steps,
    form,
    toast,
    modal,
    users,
    progress,
    router: connectRouter(history)
  })
  return function(state,action){
    if(action.type === "LOGOUT"){
      API.setToken(null);
      localStorage.removeItem('login_data_4_16')
      state = {};
    }
    return reducers(state, action);
  }
}
