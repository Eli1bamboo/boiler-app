import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { grantAdmin } from '../../store/actions/userActions'
import moment from 'moment'

class UserDetails extends Component {
	handleGrantAdmin = (e) => {
		const { id } = this.props

		e.preventDefault()

		this.props.grantAdmin(id)
		// this.props.history.push('/users');
	}

	render() {
		const { user, auth } = this.props

		if (!auth.uid) return <Redirect to="/signin" />
		if (user) {
			return (
				<div className="container user-details">
					<div className="row">
						<div className="col s12 m8 offset-m2">
							<div className="card horizontal">
								<div className="card-image waves-effect waves-block waves-light">
									<img className="activator" src={user.avatarUrl} alt={'avatar'} />
								</div>
								<div className="card-content">
									<span className="card-title grey-text text-darken-4">
										{user.displayName}
										<i className="material-icons right activator">more_vert</i>
									</span>
									<p>
										<ul className="collection with-header">
											<li className="collection-header">
												<h4>{user.providerData[0].uid}</h4>
											</li>
											<li className="collection-item">Email: {user.providerData[0].email}</li>
											<li className="collection-item">
												Last login at: {moment(user.lastLoginAt.toDate()).calendar()}
											</li>
											<li className="collection-item">
												Created At: {moment(user.createdAt.toDate()).calendar()}
											</li>
											<li className="collection-item">
												Is Admin:{' '}
												{user.isAdmin ? (
													<i className="material-icons">check_circle</i>
												) : (
													<i className="material-icons">cancel</i>
												)}
											</li>
										</ul>
									</p>
								</div>
								<div className="card-reveal">
									<span className="card-title grey-text text-darken-4">
										Actions<i className="material-icons right">close</i>
									</span>
									<p>
										<ul className="collection with-header">
											<li className="collection-item">
												<div>
													Delete User<a href="#!" className="secondary-content">
														<i className="material-icons">delete</i>
													</a>
												</div>
											</li>
											<li className="collection-item">
												<div>
													Grant Admin<a href="#!" className="secondary-content">
														<i className="material-icons" onClick={this.handleGrantAdmin}>
															check_circle
														</i>
													</a>
												</div>
											</li>
											{user.isAdmin ? (
												<li className="collection-item">
													<div>
														Revoke Admin<a href="#!" className="secondary-content">
															<i className="material-icons">cancel</i>
														</a>
													</div>
												</li>
											) : null}
										</ul>
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			)
		} else {
			return (
				<div className="container center">
					<p>Loading user...</p>
				</div>
			)
		}
	}
}

const mapStateToProps = (state, ownProps) => {
	const id = ownProps.match.params.id
	const users = state.firestore.data.users
	const user = users ? users[id] : null

	return {
		id: id,
		user: user,
		users: users,
		auth: state.firebase.auth
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		grantAdmin: (id) => dispatch(grantAdmin(id))
	}
}

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect([
		{
			collection: 'users'
		}
	])
)(UserDetails)
