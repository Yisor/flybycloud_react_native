'use strict';

import * as TYPES from './actionTypes';

const initialState = {
  refundDetail: {},
  status: null,
}

const refundDetail = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.QUERY_REFUND_DETAIL_SUCCESS:
      return {
        ...state,
        refundDetail: action.data,
        status: "Done"
      };
    default:
      return state;
  }
}
export default refundDetail;