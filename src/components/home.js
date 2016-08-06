import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {

	render() {
		console.log(this.props);
		console.log(JSON.parse(localStorage.getItem('authResponse')));
		const authResponse = JSON.parse(localStorage.getItem('authResponse'));
		if(!authResponse) {
			return (
				<div>
					<h1>FAIL!!!!</h1>
				</div>
			);
		}
		
		return (
			<div>
				<h1>HOME!!!!</h1>
			</div>
		);
		
	}
}

function mapStateToProps(state) {
	return { authResponse: state.authResponse };
}

//export default connect(mapStateToProps)(Home);
export default connect(mapStateToProps, null)(Home);