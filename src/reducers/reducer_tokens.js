import { GET_TOKEN_SUCCESS, GET_TOKEN_ERROR, DECODE_TOKEN_SUCCESS } from '../actions/index';

const INITIAL_STATE = { idToken: null, decodedToken: null, accessToken: null };

export default function(state=INITIAL_STATE, action) {
	switch(action.type) {
		case GET_TOKEN_SUCCESS: {
			return { ...state, idToken: action.payload };
		}
		case GET_TOKEN_ERROR: {
			return INITIAL_STATE;
		}
		case DECODE_TOKEN_SUCCESS: {
			return {...state, decodedIdToken: action.payload };
		}
		default:
			return state;
	}
}