'use strict';

import * as TYPES from '../actions/types';

const initialState = {
	user: {},
	status: null,
};

const login = (state = initialState, action) => {
	switch (action.type) {
		case TYPES.LOGGED_DOING:
			console.log('login' + JSON.stringify(action.user));
			return {
				...state,
				user: action.user,
				status: "Done"
			};
		default:
			return state;
	}
}
export default login;