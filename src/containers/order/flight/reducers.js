'use strict';

import * as TYPES from './actionTypes';

const initialState = {
  flightOrders: [],
  flightOrderDetail: {},
  status: null,
}

const order = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.QUERY_FLIGHT_ORDER_SUCCESS:
      return {
        ...state,
        flightOrders: action.data,
        status: "Done"
      };
    case TYPES.QUERY_FLIGHT_ORDER_DETAIL_SUCESS:
      return {
        ...state,
        flightOrderDetail: action.data,
      };
    case TYPES.LOAD_MORE_ORDER:
      return {
        ...state,
        status: "Loading"
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