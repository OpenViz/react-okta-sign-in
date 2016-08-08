import React, { Component } from 'react';
import { connect } from 'react-redux';
import JSONTree from 'react-json-tree';

import DivJSON from './div_json';

import { createAuth, getTokens, renewIdToken, decodeIdToken } from '../actions/index';

class Home extends Component {
	componentWillMount() {
		//	create auth and put in props
		this.props.createAuth();
	}

	localStorageToState() {

	}

	getTokens() {
		const { auth, login } = this.props;
		this.props.getTokens(login, auth);
	}

	renewIdToken() {
		const { auth } = this.props;
		this.props.renewIdToken(auth);
	}

	decodeIdToken() {
		const { auth, tokens } = this.props;
		this.props.decodeIdToken(tokens.idToken, auth);
	}

	refreshSession() {

	}

	render() {
		console.log(this.props);

		const { login, session, token } = this.props;
		
		if(true/*login && login.success*/) { //maybe add className under-header
			return (
				<div className="row under-header"> 
					<div className="col-md-2"><br />
						<div className="affix">
							{ (() => {
							  	if(session) {
									return (
										<div className="btn-group-vertical" /*ng-if="session == 'true'"*/ >
									     	<button type="button" className="btn btn-lg btn-primary" onClick={this.getTokens.bind(this)}/*ng-click="getTokens(auth)" ng-if="!userInfo"*/ >Get Tokens</button>
										  	<button type="button" className="btn btn-lg btn-success" onClick={this.refreshSession.bind(this)}/*ng-click="refreshSession()"*/ >Refresh Session</button>
										  	<button type="button" className="btn btn-lg btn-danger" /*ng-click="closeSession()"*/ >Close Session</button>
										</div>
										<br /><br /><br />
									);
								}
							})() }
							{ (() => {
						  		if(session && tokens.idToken) {
									 return (
									 	<div className="btn-group-vertical" /*ng-if="session == 'true' && userInfo"*/ >
									     	<button type="button" className="btn btn-lg btn-primary" onClick={this.renewIdToken.bind(this)}>Renew ID Token</button>
										  	<button type="button" className="btn btn-lg btn-info" onClick={this.decodeIdToken.bind(this)}>Decode ID Token</button>
										</div>
									);
								}
							})() }
							<br /><br /><br />
							<button type="button" className="btn btn-lg btn-info" /*ng-if="session == 'false'" ng-click="signout()"*/ >Re-Authenticate</button>
						</div>
					</div>
					<div className="col-md-1"></div>
						<div className="col-md-9">
							<h3><JSONTree data={this.props.auth}/></h3>
							<h3 id="userResponseAnchor">
								User Response
								{ (() => {
									if(login.success) {
										return <span className="label label-primary pull-right">Active Session</span>
									} else {
										return <span className="label label-warning pull-right">Closed Session</span>
									}
								})() }
							</h3>
						  	<pre><JSONTree data={this.props.login.res} /></pre>
						  	<DivJSON json={this.props.tokens.idToken} title="ID Token" />
						  	<DivJSON json={this.props.tokens.accessToken} title="Access Token" />
						  	<DivJSON json={this.props.tokens.decodedIdToken} title="Decoded ID Token" />
						</div>
				</div>
			);
		}
		
		return (
			<div className="under-header">
				<h3> Please <a href="/"> Sign in to continue</a></h3>
			</div>
		);
		
	}
}

function mapStateToProps(state) {
	return { auth: state.auth, login: JSON.parse(localStorage.getItem('login')), tokens: state.tokens };
}

export default connect(mapStateToProps, { createAuth, getTokens, renewIdToken, decodeIdToken })(Home);