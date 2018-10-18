import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signInGoogle, signInFacebook } from '../../store/actions/authActions';
import { Redirect } from 'react-router-dom';

class SignIn extends Component {
	handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value
		});
	};
	handleSubmitGoogle = (e) => {
		e.preventDefault();
		// this.props.signIn(this.state)
		this.props.signInGoogle();
	};

	handleSubmitFacebook = (e) => {
		e.preventDefault();
		// this.props.signIn(this.state)
		this.props.signInFacebook();
	};

	render() {
		const { authError, auth, isLoading } = this.props;

		if (auth.uid) return <Redirect to="/" />;

		return (
			<div className="container">
				{isLoading ? (
					<div className="progress login-progress">
						<div className="indeterminate" />
					</div>
				) : null}
				<div className="login-buttons hoverable">
					<h4>Sign in with:</h4>
					<a className="waves-effect waves-light btn-large red darken-1" onClick={this.handleSubmitGoogle}>
						<i className="fab fa-google-plus-square" /> Google
					</a>
					<a
						className="waves-effect waves-light btn-large light-blue darken-1"
						onClick={this.handleSubmitFacebook}
					>
						<i className="fab fa-facebook-square" /> Facebook
					</a>
					<div className="center red-text">{authError ? <p>{authError}</p> : null}</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	console.log(state);
	return {
		authError: state.auth.authError,
		auth: state.firebase.auth,
		isLoading: state.auth.isLoading
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		signInGoogle: () => dispatch(signInGoogle()),
		signInFacebook: () => dispatch(signInFacebook())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
