export const CREATE_AUTH = 'CREATE_AUTH';
export const LOGIN_AUTH_SUCCESS = 'LOGIN_AUTH_SUCCESS';
export const LOGIN_AUTH_ERROR = 'LOGIN_AUTH_ERROR';
export const GET_TOKEN_SUCCESS = 'GET_TOKEN_SUCCESS';
export const GET_TOKEN_ERROR = 'GET_TOKEN_ERROR';
export const RENEW_ID_TOKEN_SUCCESS = 'RENEW_ID_TOKEN_SUCCESS';
export const RENEW_ID_TOKEN_ERROR = 'RENEW_ID_TOKEN_ERROR';
export const DECODE_ID_TOKEN_SUCCESS = 'DECODE_ID_TOKEN_SUCCESS';
export const DECODE_ID_TOKEN_ERROR = 'DECODE_ID_TOKEN_ERROR';
export const REFRESH_SESSION_SUCCESS = 'REFRESH_SESSION_SUCCESS';
export const REFRESH_SESSION_ERROR = 'REFRESH_SESSION_ERROR';
export const CLOSE_SESSION_SUCCESS = 'CLOSE_SESSION_SUCCESS';
export const CLOSE_SESSION_ERROR = 'CLOSE_SESSION_ERROR';
export const LOGOUT_AUTH_SUCCESS = 'LOGOUT_AUTH_SUCCESS';
export const LOGOUT_AUTH_ERROR = 'LOGOUT_AUTH_ERROR';

const BASE_URL = "https://dev-570863.oktapreview.com";
const CLIENT_ID = "OaCz3jBQxbaEnsDAFO3A";
const REDIRECT_URI = "http://localhost:8080/";

const RESPONSE_TYPE = ['id_token', 'token'];
var CLIENT_SCOPES = ['openid', 'email', 'profile', 'groups'];


// CREATE AUTH ACTIONS

/**
 *	Creates the Okta Authentication binding
 */
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

// LOGIN ACTIONS

/**
 *	Uses the Okta AuthSDK to establish a session given
 *	"username" and "password"	
 */
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

// GET TOKENS ACTIONS

/**
 *	Given a sessionToken, returns "idToken" and/or "accessToken",
 *	and user "clams"
 */
export function getTokens(login, auth) {
	return function(dispatch) {
		if(auth.session.exists()) {
			auth.idToken.authorize({
				sessionToken: login.res.sessionToken,
				responseType: RESPONSE_TYPE,
				scope: ['openid', 'email', 'profile', 'groups']
			})
			.then((response) => {
				dispatch(getTokensSuccess(response));
			})
			.catch((error) => {
				dispatch(getTokenError(error));
			});
		} else {
			dispatch(getTokenError('session not exists'));
		}
	}
}

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

// REFRESH TOKEN ACTIONS

/**
 *	Renews the current ID token
 */
export function renewIdToken(auth) {
	return function(dispatch) {
		if(auth.session.exists()) {
			auth.idToken.refresh({ 'scope': ['openid', 'email', 'profile', 'groups'] })
			.then((response) => {
				dispatch(renewIdTokensSuccess(response));
			})
			.catch((error) => {
				dispatch(renewIdTokenError(error));
			});
		} else {
			dispatch(renewIdTokenError('session not exists'));
		}
	}
}

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

// DECODE TOKEN ACTIONS

/**
 *	Given an "idToken", it decodes the
 *	header, payload, and signiture
 */
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

// REFRESH SESSION ACTIONS

/**
 *	Refreshes the current session
 */
export function refreshSession(auth) {
	return function(dispatch) {
		auth.session.refresh()
		.then((response) => {
			dispatch(refreshSessionSuccess(response));
		})
		.catch((error) => {
			dispatch(refreshSessionError(error));
		});
	}
}

function refreshSessionSuccess(response) {
	return {
		type: REFRESH_SESSION_SUCCESS,
		payload: response
	};
}

function refreshSessionError(error) {
	return {
		type: REFRESH_SESSION_ERROR,
		payload: error
	};
}

// CLOSE SESSION ACTIONS

/**
 * 	Closes the current session
 */
export function closeSession(auth) {
	return function(dispatch) {
		auth.session.close()
		.then((response) => {
			dispatch(closeSessionSuccess(response));
		})
		.catch((error) => {
			dispatch(closeSessionError(error));
		});
	}
}

function closeSessionSuccess(response) {
	return {
		type: CLOSE_SESSION_SUCCESS,
		payload: response
	};
}

function closeSessionError(error) {
	return {
		type: CLOSE_SESSION_ERROR,
		payload: error
	};
}

// SIGNOUT ACTIONS

/**
 *	Logs the user out of the current session
 */
export function signOut(auth) {
	return function(dispatch) {
		auth.session.exists()
		.then((exists) => {
			if(exists) {
				closeSessionAndSignOut();  // TO TEST
			}
			dispatch(signOutSuccess('Session already closed.'));
		})
		.catch((error) => {
			dispatch(signOutError(error));
		});
	}
}

function closeSessionAndSignOut() {
	return function(dispatch) {
		auth.signOut()
		.then((response) => {
			dispatch(signOutSuccess(response));
		})
		.catch((error) => {
			dispatch(signOutError(error));
		});
	}
}

function signOutSuccess(response) {
	return {
		type: LOGOUT_AUTH_SUCCESS,
		payload: response
	}
}

function signOutError(error) {
	return {
		type: LOGOUT_AUTH_ERROR,
		payload: error
	}
}