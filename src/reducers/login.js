'use strict';

import * as TYPES from '../actions/types';

const initialState = {
	user: {},
	status: null,
};

export default function login(state = initialState, action) {
	switch (action.type) {
		case TYPES.LOGGED_IN:
			return {
				...state,
				user: action.user,
				status: "Done"
			};
		default:
			return state;
	}
}