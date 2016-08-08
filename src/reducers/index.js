import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import AuthReducer from './reducer_auth';
import LoginReducer from './reducer_login';
import SessionReducer from './reducer_session';
import TokensReducer from './reducer_tokens';

const rootReducer = combineReducers({
  auth : AuthReducer,
  login : LoginReducer,
  session: SessionReducer,
  tokens: TokensReducer,
  form: formReducer
});

export default rootReducer;
