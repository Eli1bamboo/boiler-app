import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'

const ContentDetails = (props) => {
	const { content, auth, users } = props

	if (!auth.uid) return <Redirect to="/signin" />

	if (content && users) {
		const author = users ? users[content.authorId] : null

		console.log(author, content)

		return (
			<Card>
				<CardHeader title={author.displayName} subtitle={author.email} avatar={author.avatarUrl} />

				{content.imageUrl ? (
					<CardMedia>
						<img src={content.imageUrl} alt="" />
					</CardMedia>
				) : null}

				<CardTitle title={content.title} subtitle={moment(content.createdAt.toDate()).calendar()} />

				<CardText>{content.content || content.caption}</CardText>
			</Card>
			// <div className="container section content-details">
			// 	<div className="card z-depth-0">
			// 		<div className="card-content">
			// 			<span className="card-title">{content.title}</span>
			// 			<p>{content.content}</p>
			// 		</div>
			// 		<div className="card-action grey lighten-4 grey-text">
			// 			<div>Posted by {content.authorName}</div>
			// 			<div>{moment(content.createdAt.toDate()).calendar()}</div>
			// 		</div>
			// 	</div>
			// </div>
		)
	} else {
		return (
			<div className="container center">
				<p>Loading content...</p>
			</div>
		)
	}
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
