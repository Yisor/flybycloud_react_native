'use strict';

import * as TYPES from './actionTypes';

const initialState = {
  user: {},
  status: null,
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.LOGGED_DOING:
      return {
        ...state,
        user: action.data,
        status: "Done"
      };
    default:
      return state;
  }
}
export default login;