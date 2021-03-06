import React, { Component } from 'react'
import { connect } from 'react-redux'
import { authWithGoogle, authWithFacebook } from '../../../store/actions/authActions'

class SocialForm extends Component {
	handleSubmitGoogle = (e) => {
		e.preventDefault()
		this.props.authWithGoogle()
	}

	handleSubmitFacebook = (e) => {
		e.preventDefault()
		this.props.authWithFacebook()
	}

	render() {
		const { authError } = this.props

		return (
			<div>
				<h5 className="grey-text text-darken-3">Authenticate with:</h5>
				<div className="social-buttons">
					<a
						className="waves-effect waves-light btn-large red darken-1 hoverable"
						onClick={this.handleSubmitGoogle}
					>
						<i className="fab fa-google-plus-square" /> Google
					</a>
					<a
						className="waves-effect waves-light btn-large light-blue darken-1 hoverable"
						onClick={this.handleSubmitFacebook}
					>
						<i className="fab fa-facebook-square" /> Facebook
					</a>
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
		authWithGoogle: () => dispatch(authWithGoogle()),
		authWithFacebook: () => dispatch(authWithFacebook())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SocialForm)
