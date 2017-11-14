import { combineReducers } from 'redux';
import { loginReducer } from '../containers/login';

export default combineReducers({
  userStore: loginReducer,
});