import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import SocialForm from './forms/SocialForm'
import EmailAndPasswordForm from './forms/EmailAndPasswordForm'
import { Paper, Toggle } from 'material-ui'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

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

		if (auth.uid) return <Redirect to="/" />

		return (
			<Fragment>
				{isLoading ? (
					<div className="progress custom-progress">
						<div className="indeterminate" />
					</div>
				) : null}

				<Paper zDepth={3} className="login-container">
					<ReactCSSTransitionGroup
						transitionName="modalTransition"
						transitionEnterTimeout={100}
						transitionLeaveTimeout={100}
					>
						{displaySocialForm ? <SocialForm /> : null}
					</ReactCSSTransitionGroup>
					<ReactCSSTransitionGroup
						transitionName="modalTransition"
						transitionEnterTimeout={100}
						transitionLeaveTimeout={100}
					>
						{displayEmailAndPasswordForm ? <EmailAndPasswordForm /> : null}
					</ReactCSSTransitionGroup>

					{authConfig.socialLogin && authConfig.userPWdLogin ? (
						<div className="toggle-form">
							<Toggle
								label="Authenticate with social"
								onToggle={this.handleOnToggle}
								labelStyle={styles.labelStyle}
							/>
						</div>
					) : null}
				</Paper>
			</Fragment>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth,
		isLoading: state.auth.isLoading
	}
}

export default connect(mapStateToProps)(SignIn)
