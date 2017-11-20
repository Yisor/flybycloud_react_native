import { combineReducers } from 'redux';
import { loginReducer } from '../containers/login';
import { flightReducer } from '../containers/flight/main';

export default combineReducers({
  userStore: loginReducer,
  flightStore: flightReducer
});