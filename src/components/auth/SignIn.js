import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signInGoogle, signInFacebook } from '../../store/actions/authActions'
import { Redirect, Link } from 'react-router-dom'
import SocialForm from './forms/SocialForm'
import EmailAndPasswordForm from './forms/EmailAndPasswordForm'
import Toggle from 'material-ui/Toggle'

const styles = {
	labelStyle: {
		color: '#9e9e9e',
		fontSize: 15,
		textAlign: 'right'
	}
}

class SignIn extends Component {
	constructor(props) {
		super(props)
		const { authConfig } = this.props

		this.state = {
			displaySocialForm: authConfig.socialLogin && authConfig.userPWdLogin ? false : authConfig.socialLogin,
			displayEmailAndPasswordForm:
				authConfig.socialLogin && authConfig.userPWdLogin ? true : authConfig.userPWdLogin
		}
	}

	handleOnToggle = () => {
		const { displaySocialForm, displayEmailAndPasswordForm } = this.state

		this.setState({
			displaySocialForm: !!!displaySocialForm,
			displayEmailAndPasswordForm: !!!displayEmailAndPasswordForm
		})
	}

	render() {
		const { auth, isLoading, authConfig } = this.props
		const { displaySocialForm, displayEmailAndPasswordForm } = this.state

		console.log(displaySocialForm)

		if (auth.uid) return <Redirect to="/" />

		return (
			<div className="login-container z-depth-3">
				{isLoading ? (
					<div className="progress login-progress">
						<div className="indeterminate" />
					</div>
				) : null}

				{displaySocialForm ? <SocialForm /> : null}

				{displayEmailAndPasswordForm ? <EmailAndPasswordForm /> : null}

				{authConfig.socialLogin && authConfig.userPWdLogin ? (
					<div className="toggle-form">
						<Toggle
							label="Authenticate with social"
							onToggle={this.handleOnToggle}
							labelStyle={styles.labelStyle}
						/>
					</div>
				) : null}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth,
		isLoading: state.auth.isLoading
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		signInGoogle: () => dispatch(signInGoogle()),
		signInFacebook: () => dispatch(signInFacebook())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
