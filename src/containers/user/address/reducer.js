'use strict';

import * as TYPES from './actionTypes';

const initialState = {
  addresses: {},
  status: null,
};

const address = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.ADDRESS_QUERY_SUCCESS:
      return {
        ...state,
        addresses: action.data,
        status: "Done"
      };
    default:
      return state;
  }
}
export default address;