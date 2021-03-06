import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import Link from 'react-router';

import { createAuth, loginAuth } from '../actions/index';

class LoginForm extends Component {
  componentWillMount() {
    //  create auth and put in props
    this.props.createAuth();
  }

  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(input) {
    const { auth } = this.props;

    this.props.loginAuth(input, auth);
  }

  redirect() {
    const { auth, login } = this.props;

    // save login in localStorage before redirection
    localStorage.setItem('login', JSON.stringify(login));
    // sets a cookie on redirect
    auth.session.setCookieAndRedirect(login.res.sessionToken, auth.options.redirectUri + 'home'); 
  }

  render() {
    const { fields:  { username, password }, login, handleSubmit } = this.props;

    if(login.success) {
      this.redirect();
    }

    return (
      <div className="row under-header">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <div className="well" style={{ background: 'none' }}>
            <center>
              <div className="page-header"><h1>Sign In</h1></div>
              <div className="text-help text-danger">
                {login.error ? login.res.message : ''}
              </div>
              <br />
              <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <div className="input-group input-group-lg">
                  <div className={`form-group ${username.touched && username.invalid ? 'has-error' : ''}`}>
                    <label>Username</label>
                    <input type="text" className="form-control" placeholder="Username" {...username} /><br />
                    <div className="text-help control-label">
                {username.touched ? username.error : ''}
              </div>
                  </div>
                  <div className={`form-group ${password.touched && password.invalid ? 'has-error' : ''}`}>
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Password" {...password} /><br />
                    <div className="text-help control-label">
                      {password.touched ? password.error : ''}
                    </div>
                  </div>
                </div>
                <br />
                <input className="btn btn-primary btn-lg" type="submit" value="Sign In" />
              </form>
              <br />
            </center>
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if(!values.username) {
    errors.username = 'Enter an Username';
  }
  if(!values.password) {
    errors.password = 'Enter a Password';
  }

  return errors;
}

function mapStateToProps(state) {
  return { auth: state.auth, login: state.login };
}

export default reduxForm({
  form: 'LoginForm',
  fields: ['username', 'password'],
  validate
}, mapStateToProps, { createAuth, loginAuth })(LoginForm);