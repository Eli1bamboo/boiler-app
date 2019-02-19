import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn } from '../../../store/actions/authActions'
import { Link } from 'react-router-dom'

class EmailAndPasswordForm extends Component {
	state = {
		email: '',
		password: ''
	}

	handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value
		})
	}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.signIn(this.state)
	}

	render() {
		const { authError } = this.props

		return (
			<div>
				<form className="white" onSubmit={this.handleSubmit}>
					<h5 className="grey-text text-darken-3">Sign in:</h5>
					<div className="input-field">
						<label htmlFor="email">Email</label>
						<input type="email" id="email" onChange={this.handleChange} />
					</div>
					<div className="input-field">
						<label htmlFor="password">Password</label>
						<input type="password" id="password" onChange={this.handleChange} />
					</div>
					<div className="input-field">
						<button className="btn pink lighten-1 z-depth-0">Login</button>
						<div className="center red-text">{authError ? <p>{authError}</p> : null}</div>
					</div>
					<div className="left grey-text mt-15">
						Don't have an account? <Link to="/signup">Register here!</Link>
					</div>
				</form>
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
		signIn: (creds) => dispatch(signIn(creds))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailAndPasswordForm)
