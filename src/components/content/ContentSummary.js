import React from 'react'
import moment from 'moment'
import ContentImage from './ContentImage'

const ContentSummary = ({ content }) => {
	const { imageUrl, authorName, createdAt, title } = content

	return (
		<div className="card horizontal hoverable">
			{imageUrl ? (
				<div className="card-image" style={{ maxHeight: '135px', overflow: 'hidden' }}>
					<ContentImage src={imageUrl} />
				</div>
			) : null}

			<div className="card-stacked">
				<div className="card-content grey-text text-darken-3">
					<span className="card-title ">{title}</span>
					<p>Posted by {authorName}</p>
					<p className="grey-text">{moment(createdAt.toDate()).calendar()}</p>
				</div>
			</div>
		</div>
	)
}

export default ContentSummary
