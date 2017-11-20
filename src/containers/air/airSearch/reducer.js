'use strict';

import * as TYPES from './actionTypes';

const initialState = {
  data: {},
  status: null,
};

const ticket = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.TICKET_QUERY:
      return {
        ...state,
        data: action.data,
        status: "Done"
      };
    default:
      return state;
  }
}
export default ticket;