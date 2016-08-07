export const CREATE_AUTH = 'CREATE_AUTH';
export const LOGIN_AUTH_SUCCESS = 'LOGIN_AUTH_SUCCESS';
export const LOGIN_AUTH_ERROR = 'LOGIN_AUTH_ERROR';

export const BASE_URL = "https://dev-570863.oktapreview.com";
export const CLIENT_ID = "OaCz3jBQxbaEnsDAFO3A";
export const REDIRECT_URI = "http://localhost:8080/";

export function createAuth() {
	const request = new OktaAuth({
		url: BASE_URL,
		clientId : CLIENT_ID,
		redirectUri: REDIRECT_URI
	});

	return {
		type: CREATE_AUTH,
		payload: request
	};
}

function loginAuthSuccess(response) {
	if(response.status === 'SUCCESS') {
		return {
			type: LOGIN_AUTH_SUCCESS,
			payload: response
		};	
	}

	return {
		type: LOGIN_AUTH_ERROR,
		payload: response
	};
}

function loginAuthError(error) {
	return {
		type: LOGIN_AUTH_ERROR,
		payload: error
	};
}

export function loginAuth(user, auth) {
	return function(dispatch) {
		auth.signIn({
			username: user.username,
			password: user.password
		})
		.then((response) => {
			dispatch(loginAuthSuccess(response));
		})
		.catch((error) => {
			dispatch(loginAuthError(error));
		});
	};
}