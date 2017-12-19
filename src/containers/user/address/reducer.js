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
    case TYPES.ADDRESS_ADD_SUCCESS:
      return {
        ...state,
        status: "Done"
      };
    case TYPES.ADDRESS_UPDATE_SUCCESS:
      return {
        ...state,
        status: "Done"
      };
    default:
      return state;
  }
}
export default address;