import { CREATE_AUTH, LOGIN_AUTH_SUCCESS, LOGIN_AUTH_ERROR, REFRESH_SESSION_SUCCESS, REFRESH_SESSION_ERROR, CLOSE_SESSION_SUCCESS, CLOSE_SESSION_ERROR, LOGOUT_AUTH_SUCCESS } from '../actions/index';

const INITIAL_STATE = { active: false, logout: false, sessionObject: null };

export default function(state=INITIAL_STATE, action) {
	switch(action.type) {
		case CREATE_AUTH : {
			return { ...state, active: true };
		}
		case LOGIN_AUTH_SUCCESS: {
			return { ...state, active: true };
		}
		case LOGIN_AUTH_ERROR: {
			return { ...state, active: false };
		}
		case REFRESH_SESSION_SUCCESS: {
			return { active: true, sessionObject: action.payload };
		}
		case REFRESH_SESSION_ERROR: {
			return {  ...state, sessionObject: action.payload };
		}
		case CLOSE_SESSION_SUCCESS: {
			return { active: false, sessionObject: null };
		}
		case CLOSE_SESSION_ERROR: {
			return {  ...state, sessionObject: action.payload };
		}
		case LOGOUT_AUTH_SUCCESS: {
			return { ...state, logout: true };
		}
		default:
			return state;
	}
}