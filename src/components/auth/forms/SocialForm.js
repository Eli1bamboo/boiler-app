import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signInGoogle, signInFacebook } from '../../../store/actions/authActions'
import { Redirect, Link } from 'react-router-dom'

class SocialForm extends Component {
	handleSubmitGoogle = (e) => {
		e.preventDefault()
		this.props.signInGoogle()
	}

	handleSubmitFacebook = (e) => {
		e.preventDefault()
		this.props.signInFacebook()
	}

	render() {
		const { authError, authConfig } = this.props

		console.log(authConfig)

		return (
			<div>
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
				<div className="grey-text mt-15">
					No tenes cuenta? <Link to="/signup">Click!</Link>
				</div>
				<div className="center red-text">{authError ? <p>{authError}</p> : null}</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		authError: state.auth.authError
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		signInGoogle: () => dispatch(signInGoogle()),
		signInFacebook: () => dispatch(signInFacebook())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SocialForm)
