import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import AuthReducer from './reducer_auth';
import LoginReducer from './reducer_login';

const rootReducer = combineReducers({
	auth : AuthReducer,
	authResponse : LoginReducer,
	form: formReducer
});

export default rootReducer;
