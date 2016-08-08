import React, { Component } from 'react';
import { connect } from 'react-redux';
import JSONTree from 'react-json-tree';

import DivJSON from './div_json';

import { createAuth, getTokens, renewIdToken, decodeIdToken, refreshSession, closeSession } from '../actions/index';

class Home extends Component {
	componentWillMount() {
		//	create auth and put in props
		this.props.createAuth();
	}

	// localStorageToState() {

	// }

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
		const { auth } = this.props;
		this.props.refreshSession(auth);
	}

	closeSession() {
		const { auth } = this.props;
		this.props.closeSession(auth);
	}

	signOut() {

	}

	render() {
		console.log(this.props);

		const { login, session, tokens } = this.props;
		
		if(login && login.success) { //maybe add className under-header
			return (
				<div className="row under-header"> 
					<div className="col-md-2"><br />
						<div className="affix">
							{ (() => {
							  	if(session.active) {
									return (
										<div className="btn-group-vertical">
									     	{(()=>{if(!tokens.idToken){return <button type="button" className="btn btn-lg btn-primary" onClick={this.getTokens.bind(this)}>Get Tokens</button>;}})()}
										  	<button type="button" className="btn btn-lg btn-success" onClick={this.refreshSession.bind(this)}>Refresh Session</button>
										  	<button type="button" className="btn btn-lg btn-danger" onClick={this.closeSession.bind(this)}>Close Session</button>
										</div>
									);
								} else {
									return <button type="button" className="btn btn-lg btn-info" onClick={this.signOut.bind(this)}>Re-Authenticate</button>;
								}
							})() }
							<br /><br /><br />
							{ (() => {
						  		if(session.active && tokens.idToken) {
									 return (
									 	<div className="btn-group-vertical">
									     	<button type="button" className="btn btn-lg btn-primary" onClick={this.renewIdToken.bind(this)}>Renew ID Token</button>
										  	<button type="button" className="btn btn-lg btn-info" onClick={this.decodeIdToken.bind(this)}>Decode ID Token</button>
										</div>
									);
								}
							})() }
							<br /><br /><br />
						</div>
					</div>
					<div className="col-md-1"></div>
						<div className="col-md-9">
							{/*<h3><JSONTree data={this.props.auth}/></h3>*/}
							<h3 id="userResponseAnchor">
								User Response
								{ (() => {
									if(session.active) {
										return <span className="label label-primary pull-right">Active Session</span>
									} else {
										return <span className="label label-warning pull-right">Closed Session</span>
									}
								})() }
							</h3>
						  	<pre><JSONTree data={login.res} hideRoot="true" /></pre>
						  	<DivJSON json={tokens.idToken} title="ID Token" />
						  	<DivJSON json={tokens.accessToken} title="Access Token" />
						  	<DivJSON json={tokens.decodedIdToken} title="Decoded ID Token" />
						  	<DivJSON json={session.sessionObject} title="Session Info" />
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
	return { auth: state.auth, login: JSON.parse(localStorage.getItem('login')), tokens: state.tokens, session: state.session };
}

export default connect(mapStateToProps, { createAuth, getTokens, renewIdToken, decodeIdToken, refreshSession, closeSession })(Home);