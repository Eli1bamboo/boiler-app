import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import { Card, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui'
import ContentImage from './ContentImage'

const ContentDetails = (props) => {
	const { content, auth, users } = props

	const author = content && users ? users[content.authorId] : null

	if (!auth.uid) return <Redirect to="/signin" />

	return (
		<div className="container">
			<div className="row">
				<div className="col s12 m1 l2" />
				{content && author ? (
					<div className="col s12 m10 l8">
						<Card>
							<CardHeader title={author.displayName} subtitle={author.email} avatar={author.avatarUrl} />

							{content.imageUrl ? (
								<CardMedia>
									<div className="img-container">
										<ContentImage src={content.imageUrl} />
									</div>
								</CardMedia>
							) : null}

							<CardTitle title={content.title} subtitle={moment(content.createdAt.toDate()).calendar()} />

							<CardText>{content.content || content.caption}</CardText>
						</Card>
					</div>
				) : (
					<div className="progress custom-progress">
						<div className="indeterminate" />
					</div>
				)}
				<div className="col s12 m1 l2" />
			</div>
		</div>
	)
}

const mapStateToProps = (state, ownProps) => {
	const id = ownProps.match.params.id
	const allContent = state.firestore.data.content
	const content = allContent ? allContent[id] : null
	const users = state.firestore.data.users

	return {
		content: content,
		users: users,
		auth: state.firebase.auth
	}
}

export default compose(
	connect(mapStateToProps),
	firestoreConnect([
		{
			collection: 'content'
		},
		{
			collection: 'users'
		}
	])
)(ContentDetails)
