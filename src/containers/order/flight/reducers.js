'use strict';

import * as TYPES from './actionTypes';

const initialState = {
  flightOrders: [],
  status: null,
};

const order = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.QUERY_FLIGHT_ORDER_SUCCESS:
      return {
        ...state,
        flightOrders: action.data,
        status: "Done"
      };
    case TYPES.LOAD_MORE_ORDER_SUCCESS:
      return {
        ...state,
        flightOrders: state.flightOrders.concat(action.data),
        status: "Done"
      };
    default:
      return state;
  }
}
export default order;