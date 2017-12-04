import { combineReducers } from 'redux';
import { loginReducer } from '../containers/login';
import { flightReducer } from '../containers/flight/list';
import { auditingReducer } from '../containers/flight/order';
import { addressReducer } from '../containers/user/address';

export default combineReducers({
  userStore: loginReducer,
  flightStore: flightReducer,
  auditingStore: auditingReducer,
  addressStore: addressReducer
});