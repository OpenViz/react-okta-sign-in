import { LOGIN_AUTH } from '../actions/index';

const INITIAL_STATE = null;

export default function(state=INITIAL_STATE, action) {
	switch(action.type) {
		case LOGIN_AUTH:
			return action.payload;
		default:
			return state;
	}
}