import React, { Component } from 'react';
import UserList from './UserList';
import Notifications from '../dashboard/Notifications';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

class UsersList extends Component {
	render() {
		const { users, auth, notifications } = this.props;
		if (!auth.uid) return <Redirect to="/signin" />;

		return (
			<div className="dashboard container">
				<div className="row">
					<div className="col s12 m6">
						<UserList users={users} />
					</div>
					<div className="col s12 m5 offset-m1">
						<Notifications notifications={notifications} />
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		users: state.firestore.ordered.users,
		auth: state.firebase.auth,
		notifications: state.firestore.ordered.notifications
	};
};

export default compose(
	connect(mapStateToProps),
	firestoreConnect([
		{ collection: 'users' },
		{ collection: 'notifications', limit: 3, orderBy: [ 'time', 'desc' ] }
	])
)(UsersList);
