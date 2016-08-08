import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import AuthReducer from './reducer_auth';
import LoginReducer from './reducer_login';
import TokensReducer from './reducer_tokens';

const rootReducer = combineReducers({
	auth : AuthReducer,
	login : LoginReducer,
	tokens: TokensReducer,
	form: formReducer
});

export default rootReducer;
