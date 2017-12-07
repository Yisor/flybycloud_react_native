import { combineReducers } from 'redux';
import { list } from '../flight/list';
import { order } from '../flight/order';
import { detail } from '../flight/detail';

export default combineReducers({
  list,
  detail,
  order
});