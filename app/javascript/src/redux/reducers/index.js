import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import auth from './auth';
import oems from './oem';
import businesses from './business';
import procedures from './procedure';
import form from './form';
import steps from './step';
import devices from './device';
import actions from './action';
import toast from './toast';
import API from '../../utils/API';

export default function(history){
  const reducers = combineReducers({
    auth,
    oems,
    businesses,
    procedures,
    devices,
    actions,
    steps,
    form,
    toast,
    router: connectRouter(history)
  })
  return function(state,action){
    if(action.type === "LOGOUT"){
      API.setToken(null);
      localStorage.removeItem('initial_state')
      state = {};
    }
    return reducers(state, action);
  }
}
