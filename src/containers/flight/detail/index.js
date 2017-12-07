
import * as actions from './actions.js';
import flightDetailReducer from './reducer.js';
import detail from './reducer.js';
import FlightDetailPage from './view/FlightDetailPage.js';
import { watchQueryFlightDetail } from './sagas.js';
export { actions, flightDetailReducer, detail, FlightDetailPage, watchQueryFlightDetail }