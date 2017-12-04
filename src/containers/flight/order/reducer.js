'use strict';

import * as TYPES from './actionTypes';

const initialState = {
  audits: {},
  status: null,
};

const flight = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.AUDITING_QUERY_SUCESS:
      return {
        ...state,
        audits: action.data,
        status: "Done"
      };
    case TYPES.COST_CENTER_QUERY_SUCESS:
      return {
        ...state,
        costCenter: action.data,
        status: "Done"
      };
    default:
      return state;
  }
}
export default flight;