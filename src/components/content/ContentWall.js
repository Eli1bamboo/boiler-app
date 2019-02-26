import React, { Component } from 'react'
import ContentList from './ContentList'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

class ContentWall extends Component {
	render() {
		const { allContent, auth } = this.props

		if (!auth.uid) return <Redirect to="/signin" />

		return (
			<div className="container">
				<div className="row">
					<div className="col s12 m2" />
					<div className="col s12 m8">
						<h5 className="grey-text text-darken-3">Content Wall</h5>
						<ContentList allContent={allContent} />
					</div>
					<div className="col s12 m2" />
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		allContent: state.firestore.ordered.content,
		auth: state.firebase.auth
	}
}

export default compose(
	connect(mapStateToProps),
	firestoreConnect([ { collection: 'content', orderBy: [ 'createdAt', 'desc' ] } ])
)(ContentWall)
