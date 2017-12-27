import { combineReducers } from 'redux';
import { login } from '../containers/login';
import { address } from '../containers/user/address';
import { flightStore } from '../containers/flight';
import { FlightOrderReducer } from '../containers/order/flight';
import { FlightRefundReducer } from '../containers/order/refund';
import { FlightResignReducer } from '../containers/order/resign';

const user = combineReducers({ login, address });

export default combineReducers({
  user,
  resign: FlightResignReducer,
  refund: FlightRefundReducer,
  order: FlightOrderReducer,
  flight: flightStore,
});