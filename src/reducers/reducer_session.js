import { LOGIN_AUTH_SUCCESS, LOGIN_AUTH_ERROR } from '../actions/index';

const INITIAL_STATE = { session: false, sessionObject: null };

export default function(state=INITIAL_STATE, action) {
	switch(action.type) {
		case LOGIN_AUTH_SUCCESS: {
			return { ...state, session: true };
		}
		case LOGIN_AUTH_ERROR: {
			return { ...state, session: false };
		}
		default:
			return state;
	}
}