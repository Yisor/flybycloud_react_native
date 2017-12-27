import * as TYPES from './actionTypes';

const initialState = {
  changeFee: {},
  status: null,
}

const resignFee = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.QUERY_CHANGE_FEE_SUCCESS:
      return {
        ...state,
        changeFee: action.data,
        status: "Done"
      };
    default:
      return state;
  }
}
export default resignFee;