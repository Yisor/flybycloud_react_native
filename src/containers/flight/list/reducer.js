'use strict';

import * as TYPES from './actionTypes';

const initialState = {
  flights: {},
  status: null,
};

const flight = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.FLIGHT_QUERY_SUCESS:
      return {
        ...state,
        flights: action.data,
        status: "Done"
      };
    default:
      return state;
  }
}
export default flight;