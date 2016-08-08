import { GET_TOKEN_SUCCESS, GET_TOKEN_ERROR, RENEW_ID_TOKEN_SUCCESS, DECODE_ID_TOKEN_SUCCESS } from '../actions/index';

const INITIAL_STATE = { idToken: null, decodedIdToken: null, accessToken: null };

export default function(state=INITIAL_STATE, action) {
	switch(action.type) {
		case GET_TOKEN_SUCCESS: {
			return { ...state, idToken: action.payload[0], accessToken: action.payload[1] };
		}
		case GET_TOKEN_ERROR: {
			return INITIAL_STATE;
		}
		case RENEW_ID_TOKEN_SUCCESS: {
			return { ...state, idToken: action.payload };
		}
		case DECODE_ID_TOKEN_SUCCESS: {
			return {...state, decodedIdToken: action.payload };
		}
		default:
			return state;
	}
}