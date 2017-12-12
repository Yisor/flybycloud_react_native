'use strict';

import * as TYPES from './actionTypes';

const initialState = {
  flights: {},
  airlines: {},
  status: null,
};

const flight = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.FLIGHT_QUERY:
      return {
        ...state,
        flights: {},
        status: "Loading"
      };
    case TYPES.FLIGHT_QUERY_SUCESS:
      return {
        ...state,
        flights: action.data,
        status: "Done"
      };
    case TYPES.AIRLINE_QUERY_SUCESS:
      return {
        ...state,
        airlines: action.data,
        status: "Done"
      };
    default:
      return state;
  }
}
export default flight;