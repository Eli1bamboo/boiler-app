import React, { Component } from 'react'
import ContentList from '../content/ContentList'
import Notifications from './Notifications'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

class Dashboard extends Component {
	render() {
		const { allContent, auth, notifications } = this.props

		if (!auth.uid) return <Redirect to="/signin" />

		return (
			<div className="container">
				<div className="row">
					<div className="col s12 m6">
						<h5 className="grey-text text-darken-3">Latest updates</h5>
						<ContentList allContent={allContent} />
					</div>
					<div className="col s12 m5 offset-m1">
						<h5 className="grey-text text-darken-3">Notifications</h5>
						<Notifications notifications={notifications} />
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		allContent: state.firestore.ordered.content,
		auth: state.firebase.auth,
		notifications: state.firestore.ordered.notifications
	}
}

export default compose(
	connect(mapStateToProps),
	firestoreConnect([
		{ collection: 'content', limit: 4, orderBy: [ 'createdAt', 'desc' ] },
		{ collection: 'notifications', limit: 3, orderBy: [ 'time', 'desc' ] }
	])
)(Dashboard)
