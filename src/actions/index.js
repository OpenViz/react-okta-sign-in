export const CREATE_AUTH = 'CREATE_AUTH';
export const LOGIN_AUTH_SUCCESS = 'LOGIN_AUTH_SUCCESS';
export const LOGIN_AUTH_ERROR = 'LOGIN_AUTH_ERROR';
export const GET_TOKEN_SUCCESS = 'GET_TOKEN_SUCCESS';
export const GET_TOKEN_ERROR = 'GET_TOKEN_ERROR';
export const RENEW_ID_TOKEN_SUCCESS = 'RENEW_ID_TOKEN_SUCCESS';
export const RENEW_ID_TOKEN_ERROR = 'RENEW_ID_TOKEN_ERROR';
export const DECODE_ID_TOKEN_SUCCESS = 'DECODE_ID_TOKEN_SUCCESS';
export const DECODE_ID_TOKEN_ERROR = 'DECODE_ID_TOKEN_ERROR';

const BASE_URL = "https://dev-570863.oktapreview.com";
const CLIENT_ID = "OaCz3jBQxbaEnsDAFO3A";
const REDIRECT_URI = "http://localhost:8080/";

const RESPONSE_TYPE = ['id_token', 'token'];
var CLIENT_SCOPES = ['openid', 'email', 'profile', 'groups'];

// CREATE AUTH ACTION

export function createAuth(uri) {
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

// LOGIN ACTION

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
			console.log('login promise', response);
			dispatch(loginAuthSuccess(response));
		})
		.catch((error) => {
			dispatch(loginAuthError(error));
		});
	};
}


// GET TOKENS ACTION

function getTokensSuccess(response) {
	return {
		type: GET_TOKEN_SUCCESS,
		payload: response
	};
}

function getTokenError(error) {
	return {
		type: GET_TOKEN_ERROR,
		payload: error
	};
}

export function getTokens(login, auth) {
	return function(dispatch) {
		if(auth.session.exists()) {
			auth.idToken.authorize({
				sessionToken: login.res.sessionToken,
				responseType: RESPONSE_TYPE,
				scope: ['openid', 'email', 'profile', 'groups']
			})
			.then((response) => {
				console.log('response', response);
				dispatch(getTokensSuccess(response));
			})
			.catch((error) => {
				console.log('error', error);
				dispatch(getTokenError(error));
			});
		} else {
			dispatch(getTokenError('session not exists'));
		}
	}
}

// REFRESH TOKEN ACTION

function renewIdTokensSuccess(response) {
	return {
		type: RENEW_ID_TOKEN_SUCCESS,
		payload: response
	};
}

function renewIdTokenError(error) {
	return {
		type: RENEW_ID_TOKEN_ERROR,
		payload: error
	};
}

export function renewIdToken(auth) {
	return function(dispatch) {
		if(auth.session.exists()) {
			console.log('in thunk');
			auth.idToken.refresh({ 'scope': ['openid', 'email', 'profile', 'groups'] })
			.then((response) => {
				console.log('response', response);
				dispatch(renewIdTokensSuccess(response));
			})
			.catch((error) => {
				console.log('error', error);
				dispatch(renewIdTokenError(error));
			});
		} else {
			dispatch(renewIdTokenError('session not exists'));
		}
	}
}

// DECODE TOKEN ACTION

export function decodeIdToken(token, auth) {
	const decoded = auth.idToken.decode(token.idToken);
	if(decoded) {
		return {
			type: DECODE_ID_TOKEN_SUCCESS,
			payload: decoded
		}
	}

	return {
		type: DECODE_ID_TOKEN_ERROR,
		payload: error
	}
}