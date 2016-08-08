import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import LoginForm from './components/login_form';
import Home from './components/home';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={LoginForm} />
    <Route path="home" component={Home} />
  </Route>
);