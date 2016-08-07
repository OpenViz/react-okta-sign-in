import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {

	render() {
		const { login } = this.props;
		console.log(JSON.parse(localStorage.getItem('login')));
		console.log(login);
		if(login && login.success) {
			return (
				<div className="under-header">
					<h1>HOME!!!!</h1>
				</div>
			);
		}
		
		return (
			<div className="under-header">
				<h1>FAIL!!!!</h1>
			</div>
		);
		
	}
}

function mapStateToProps(state) {
	return { login: JSON.parse(localStorage.getItem('login')) };
}

//export default connect(mapStateToProps)(Home);
export default connect(mapStateToProps, null)(Home);