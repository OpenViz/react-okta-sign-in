import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import Link from 'react-router';

import { createAuth, loginAuth } from '../actions/index';

class LoginForm extends Component {
	componentWillMount() {
		//create auth here and put in props
		this.props.createAuth();
	}

	static contextTypes = {
		router: PropTypes.object
	};

	onSubmit(input) {
		const authClient = this.props.auth;
		console.log(authClient.auth);
		console.log(input)

		// WORKING BUT SOSO
		// authClient.signIn({
		// 	username: input.username,
		// 	password: input.password
		// })
		// .then(function(transaction) { // On success
		//  switch(transaction.status) {
		    
		//     case 'SUCCESS':
		//       authClient.session.setCookieAndRedirect(transaction.sessionToken, authClient.options.redirectUri+"home"); // Sets a cookie on redirect
		//       break;

		//     default:
		//       throw 'We cannot handle the ' + transaction.status + ' status';
		//   }
		// })
		// .fail(function(err) { // On failure
		//   console.error(err);
		// });

		this.props.loginAuth(input, authClient)
		.then((action) => { // On success
			const transaction = action.payload;
			localStorage.setItem('authResponse', JSON.stringify(transaction));
			// if(action.error) {
			// 	console.error(transaction.message);
			// 	return;
			// }
		 	switch(transaction.status) {
		    
				case 'SUCCESS':
			      authClient.session.setCookieAndRedirect(transaction.sessionToken, authClient.options.redirectUri+"home"); // Sets a cookie on redirect
			      break;

			    default:
			      throw 'We cannot handle the ' + transaction.status + ' status';
		 	}
		})
		.catch((err) => {
			console.error("in error", error);
		});
		// .fail(function(err) { // On failure
		//   console.error(err);
		// });
	}

	render() {
		const { fields:  { username, password }, handleSubmit } = this.props;

		return (
			<div className="row">
			  <div className="col-md-3"></div>
			  <div className="col-md-6">
			    <div className="well" style={{ background: 'none' }}>
			      <center>
			        <div className="page-header"><h1>Sign In</h1></div>
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
			      </center>
			      {/*<pre ng-if="error" style="color:red">Error = {{error | json}}</pre>*/}
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
	return { auth: state.auth };
}

export default reduxForm({
	form: 'LoginForm',
	fields: ['username', 'password'],
	validate
}, mapStateToProps, { createAuth, loginAuth })(LoginForm);