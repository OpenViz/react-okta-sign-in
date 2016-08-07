import { LOGIN_AUTH_SUCCESS, LOGIN_AUTH_ERROR } from '../actions/index';

const INITIAL_STATE = { res: null, success: false, error: false };

export default function(state=INITIAL_STATE, action) {
	switch(action.type) {
		case LOGIN_AUTH_SUCCESS: {
			console.log('in success redux');
			return { res: action.payload, success: true, error: false };
		}
		case LOGIN_AUTH_ERROR: {
			console.log('in error redux');
			return { res: action.payload, success: false, error: true };
		}
		default:
			return state;
	}
}