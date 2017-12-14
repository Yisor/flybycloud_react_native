'use strict';

import * as TYPES from './actionTypes';

const initialState = {
  economyClass: {},
  businessClass: {},
  firstClass: {},
  governmentClass: {},
  flightDetails: null,
  returnDetails: null,
  status: null
}

const flight = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.ECONOMY_QUERY_SUCESS:
      return {
        ...state,
        economyClass: action.data,
        status: "Done"
      };
    case TYPES.BUSINESS_QUERY_SUCESS:
      return {
        ...state,
        businessClass: action.data,
        status: "Done"
      };
    case TYPES.FIRST_QUERY_SUCESS:
      return {
        ...state,
        firstClass: action.data,
        status: "Done"
      };
    case TYPES.GPTICKET_QUERY_SUCESS:
      return {
        ...state,
        firstClass: {},
        businessClass: {},
        economyClass: {},
        governmentClass: action.data,
        status: "Done"
      };
    case TYPES.FLIGHT_DETAILS:
      return {
        ...state,
        flightDetails: action.data,
        returnDetails: {},
      };
    case TYPES.RETURN_DETAILS:
      return {
        ...state,
        returnDetails: action.data,
      };
    default:
      return state;
  }
}
export default flight;