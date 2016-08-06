export const CREATE_AUTH = 'CREATE_AUTH';
export const LOGIN_AUTH = 'LOGIN_AUTH';

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

export function loginAuth(user, auth) {
	console.log('loginAuth', auth);
	console.log('user', user);
	const request = auth.signIn({
		username: user.username,
		password: user.password
	});

	return {
		type: LOGIN_AUTH,
		payload: request
	};
}